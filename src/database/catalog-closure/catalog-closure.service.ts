import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogClosure } from './catalog-closure.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class CatalogClosureService {
    constructor(
        @InjectRepository(CatalogClosure)
        private catalogClosureRepository: Repository<CatalogClosure>
    ) {}

    delete(catalogId: number): Promise<DeleteResult> {
        return this.catalogClosureRepository.query(
            `DELETE a FROM catalog_closure AS a
            JOIN catalog_closure AS d ON a.child_id = d.child_id
            LEFT JOIN catalog_closure AS x
            ON x.parent_id = d.parent_id AND x.child_id = a.parent_id
            WHERE d.parent_id = ? AND x.parent_id IS NULL;`,
            [catalogId]
        );
    }

    insert(parentId: number, childId: number): Promise<any> {
        return this.catalogClosureRepository.query(
            `INSERT INTO catalog_closure (parent_id, child_id, level)
		    SELECT c.parent_id, ?, c.level+1
            FROM catalog_closure c
		    WHERE c.child_id = ?
		    UNION ALL
		    SELECT ?, ?, 0`,
            [childId, parentId, childId, childId]
        );
    }

    async move(newParentId: number, childId: number): Promise<any> {
        await this.delete(childId);
        const raw = await this.catalogClosureRepository.query(
            `INSERT INTO catalog_closure (parent_id, child_id, level)
             SELECT cc.parent_id, cc2.child_id, cc.level+cc2.level+1
             FROM catalog_closure AS cc JOIN catalog_closure AS cc2
             WHERE cc2.parent_id = ?
               AND cc.child_id = ?;`,
            [childId, newParentId]
        );
        return raw;
    }
}
