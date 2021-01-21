import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClosureState } from './closure-state.entity';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class ClosureStateService {
    constructor(
        @InjectRepository(ClosureState)
        private closureStateRepository: Repository<ClosureState>
    ) {}

    async save(
        catalogId: number,
        catalogStateId: number
    ): Promise<InsertResult> {
        return this.closureStateRepository.query(
            `INSERT INTO closure_state (catalog_state_id, parent_id, child_id)
             SELECT ?, parent_id, child_id FROM catalog_closure WHERE child_id = ?`,
            [catalogStateId, catalogId]
        );
    }
}
