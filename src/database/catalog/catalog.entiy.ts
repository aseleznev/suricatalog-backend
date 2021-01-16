import { CatalogState } from '../catalog-state/catalog-state.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'catalog' })
export class Catalog {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @OneToMany(() => CatalogState, (catalogState) => catalogState.catalog)
    states: CatalogState[];

    @Column({ name: 'state_id', type: 'bigint' })
    currentState: CatalogState;
}
