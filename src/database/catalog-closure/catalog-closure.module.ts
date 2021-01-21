import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogClosure } from './catalog-closure.entity';
import { CatalogClosureService } from './catalog-closure.service';

@Module({
    imports: [TypeOrmModule.forFeature([CatalogClosure])],
    providers: [CatalogClosureService],
    exports: [CatalogClosureService]
})
export class CatalogClosureModule {}
