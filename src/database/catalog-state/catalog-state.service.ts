import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogState } from './catalog-state.entity';
import { InsertResult, Repository } from 'typeorm';
import { ClosureStateService } from '../closure-state/closure-state.service';

@Injectable()
export class CatalogStateService {
    constructor(
        @InjectRepository(CatalogState)
        private catalogStateRepository: Repository<CatalogState>,
        private readonly closureStateService: ClosureStateService
    ) {}

    async insert(catalogState: CatalogState): Promise<number> {
        const catalogStateRaw = await this.catalogStateRepository.insert(
            catalogState
        );
        await this.closureStateService.save(
            catalogState.catalog.id,
            catalogStateRaw.identifiers[0].id
        );
        return catalogStateRaw.identifiers[0].id;
    }
}
