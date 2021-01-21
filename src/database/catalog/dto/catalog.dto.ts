export class CatalogDto {
    constructor(init?: Partial<CatalogDto>) {
        Object.assign(this, init);
    }
    id: number;
    name: number;
    level: number;
    parentId: number;
    children: CatalogDto[];
}
