import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogState } from './catalog-state.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CatalogState])]
})
export class CatalogStateModule {}
