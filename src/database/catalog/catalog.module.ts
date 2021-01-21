import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Catalog } from './catalog.entiy';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { CatalogStateModule } from '../catalog-state/catalog-state.module';
import { CatalogClosureModule } from '../catalog-closure/catalog-closure.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Catalog]),
        CatalogStateModule,
        CatalogClosureModule
    ],
    providers: [CatalogService],
    exports: [CatalogService],
    controllers: [CatalogController]
})
export class CatalogModule {}
