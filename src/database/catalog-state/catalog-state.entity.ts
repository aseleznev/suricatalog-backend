import { Catalog } from '../catalog/catalog.entiy';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'catalog_state' })
export class CatalogState {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ManyToOne(() => Catalog, (catalog) => catalog.states)
    @JoinColumn({ name: 'catalog_id' })
    catalog: Catalog;

    @Column({ name: 'name', type: 'varchar' })
    name: string;
}
