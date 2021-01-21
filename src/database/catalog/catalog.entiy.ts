import { CatalogState } from '../catalog-state/catalog-state.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'catalog' })
export class Catalog {
    constructor(init?: Partial<Catalog>) {
        if (init) {
            Object.assign(this, init);
            // this.currentState = init.currentState
            //     ? new CatalogState(init.currentState)
            //     : null;
            // this.parent = init.parent ? new Catalog(init.parent) : null;
        }
    }

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @OneToMany(() => CatalogState, catalogState => catalogState.catalog)
    states: CatalogState[];

    @OneToOne(() => CatalogState, catalogState => catalogState.catalog)
    @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
    currentState: CatalogState;

    @ManyToOne(() => Catalog, catalog => catalog.parent)
    @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
    parent: Catalog;
}
