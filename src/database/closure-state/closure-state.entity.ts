import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { CatalogState } from '../catalog-state/catalog-state.entity';

@Entity({ name: 'closure_state' })
export class ClosureState {
    constructor(init?: Partial<ClosureState>) {
        if (init) {
            Object.assign(this, init);
        }
    }

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @ManyToOne(() => CatalogState, catalogState => catalogState.closureStates)
    @JoinColumn({ name: 'catalog_state_id' })
    catalogState: CatalogState;

    @Column({ name: 'parent_id', type: 'int' })
    parentId: number;

    @Column({ name: 'child_id', type: 'int' })
    childId: number;
}
