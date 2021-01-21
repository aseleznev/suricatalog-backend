import { Injectable } from '@nestjs/common';
import { InsertResult, Repository } from 'typeorm';
import { Catalog } from './catalog.entiy';
import { InjectRepository } from '@nestjs/typeorm';
import * as path from 'path';
import {
    CatalogState,
    OperationType
} from '../catalog-state/catalog-state.entity';
import { CatalogStateService } from '../catalog-state/catalog-state.service';
import { CatalogClosureService } from '../catalog-closure/catalog-closure.service';
import { CatalogDto } from './dto/catalog.dto';

@Injectable()
export class CatalogService {
    constructor(
        @InjectRepository(Catalog)
        private catalogRepository: Repository<Catalog>,
        private readonly catalogStateService: CatalogStateService,
        private readonly catalogClosureService: CatalogClosureService
    ) {}

    async getRoot(): Promise<CatalogDto[]> {
        const catalogRaw = await this.catalogRepository.query(
            `SELECT c.id, c.parent_id as parentId, cc.child_id as childId, cs.name, cc.level
             FROM catalog c
             JOIN catalog_closure cc on (c.id = cc.parent_id)
             INNER JOIN catalog_state cs on (cs.id = cc.child_id)
             WHERE c.parent_id is NULL AND cc.level < 2`
        );
        const rootNodes = catalogRaw
            .filter(catalog => catalog.level === 0)
            .map((_: Partial<CatalogDto>) => new CatalogDto(_));
        rootNodes.map(node => {
            catalogRaw.filter(cat => cat.parentId === node.id);
        });
    }

    async getChildren(parentId: number): Promise<CatalogDto[]> {
        const catalogRaw = await this.catalogRepository.query(
            `SELECT cs.name, c.id, c.parent_id as parentId
            FROM catalog c
            JOIN catalog_closure cc ON (c.id = cc.child_id)
            INNER JOIN catalog_state cs ON c.state_id = cs.id 
            WHERE cc.parent_id = ? AND c.parent_id = ?`,
            [parentId, parentId]
        );
        return catalogRaw.map((_: Partial<CatalogDto>) => new CatalogDto(_));
    }

    async insert(catalog: Catalog): Promise<number> {
        const catalogRaw = await this.catalogRepository.insert(catalog);
        await this.catalogClosureService.insert(
            catalog?.parent?.id,
            catalogRaw.identifiers[0].id
        );
        return catalogRaw.identifiers[0].id;
    }

    async updateState(catalogId: number, stateId: number): Promise<void> {
        await this.catalogRepository.query(
            `UPDATE catalog c SET c.state_id = ? WHERE c.id = ?`,
            [stateId, catalogId]
        );
    }

    async updateParent(catalog: Catalog, newParentId: number): Promise<void> {
        await this.catalogRepository.query(
            `UPDATE catalog c SET c.parent_id = ? WHERE c.id = ?`,
            [newParentId, catalog.id]
        );
        await this.catalogClosureService.move(newParentId, catalog.id);

        const childState = new CatalogState({
            ...catalog.currentState,
            id: undefined,
            catalog,
            operation: OperationType.UPDATE_PARENT,
            createdAt: new Date()
        });
        const stateId = await this.catalogStateService.insert(childState);
        if (stateId) {
            await this.updateState(catalog.id, stateId);
        }
    }

    async findByName(name: string): Promise<Catalog | undefined> {
        const catalogRaw = await this.catalogRepository.query(
            `SELECT c.id FROM catalog c
             INNER JOIN catalog_state cs ON c.id = cs.catalog_id
             WHERE cs.name = ?`,
            [name]
        );
        const catalog = await this.catalogRepository.findOne(
            {
                id: catalogRaw.length > 0 ? catalogRaw[0].id : null
            },
            { relations: ['currentState', 'parent'] }
        );

        return catalog;
    }

    async uploadDrugs() {
        const XLSX = require('xlsx');
        const workbook = XLSX.readFile(
            path.resolve(__dirname, '..', '..', '..', 'catalog2.xlsx')
        );
        const xlData: [] = XLSX.utils.sheet_to_json(
            workbook.Sheets[workbook.SheetNames[0]]
        );
        console.log(xlData.length);

        let row: object = {};
        for (row of xlData) {
            let parent = null;
            for (const key in row) {
                if (key !== 'drug') {
                    let child = await this.findByName(row[key]);
                    if (!child) {
                        child = new Catalog({ parent });
                        await this.insert(child);
                        const childState = new CatalogState({
                            name: row[key],
                            catalog: child,
                            operation: OperationType.ADD,
                            createdAt: new Date()
                        });
                        await this.catalogStateService.insert(childState);
                        child.currentState = childState;
                        await this.updateState(child.id, childState.id);
                    } else {
                        if (child.parent?.id !== parent?.id) {
                            await this.updateParent(child, parent?.id);
                            child.parent = parent;
                        }
                    }
                    parent = child;
                }
            }
        }
    }
}
