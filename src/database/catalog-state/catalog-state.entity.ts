import { Catalog } from '../catalog/catalog.entiy';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { ClosureState } from '../closure-state/closure-state.entity';

export enum OperationType {
    ADD = 'add',
    UPDATE = 'update',
    UPDATE_PARENT = 'update_parent',
    DELETE = 'delete'
}

@Entity({ name: 'catalog_state' })
export class CatalogState {
    constructor(init?: Partial<CatalogState>) {
        if (init) {
            Object.assign(this, init);
            // this.catalog = init.catalog ? new Catalog(init.catalog) : null;
        }
    }

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @ManyToOne(() => Catalog, catalog => catalog.states)
    @JoinColumn({ name: 'catalog_id' })
    catalog: Catalog;

    @Column({ name: 'name', type: 'varchar' })
    name: string;

    @Column({ name: 'operation', type: 'enum', enum: OperationType })
    operation: OperationType;

    @Column({ name: 'created_at', type: 'datetime' })
    createdAt: Date;

    @OneToMany(() => ClosureState, closureState => closureState.catalogState)
    closureStates: ClosureState[];
}
