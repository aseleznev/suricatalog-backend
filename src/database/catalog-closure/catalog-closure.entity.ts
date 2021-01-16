import { Catalog } from '../catalog/catalog.entiy';
import { Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'catalog_closure' })
export class CatalogClosure {
    @OneToOne(() => Catalog, { primary: true })
    @JoinColumn({ name: 'parent_id' })
    parent: Catalog;

    @OneToOne(() => Catalog, { primary: true })
    @JoinColumn({ name: 'child_id' })
    child: Catalog;
}
