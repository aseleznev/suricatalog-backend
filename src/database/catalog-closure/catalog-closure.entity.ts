import { Catalog } from '../catalog/catalog.entiy';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'catalog_closure' })
export class CatalogClosure {
    constructor(init?: Partial<CatalogClosure>) {
        if (init) {
            Object.assign(this, init);
        }
    }

    @ManyToOne(() => Catalog, { primary: true })
    @JoinColumn({ name: 'parent_id' })
    @Index()
    parent: Catalog;

    @ManyToOne(() => Catalog, { primary: true })
    @JoinColumn({ name: 'child_id' })
    @Index()
    child: Catalog;

    @Column({ name: 'level', type: 'int' })
    level: number;
}
