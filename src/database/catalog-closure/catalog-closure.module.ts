import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogClosure } from './catalog-closure.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CatalogClosure])]
})
export class CatalogClosureModule {}
