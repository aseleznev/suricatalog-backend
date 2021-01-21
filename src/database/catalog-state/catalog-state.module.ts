import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogState } from './catalog-state.entity';
import { CatalogStateService } from './catalog-state.service';
import { ClosureStateModule } from '../closure-state/closure-state.module';

@Module({
    imports: [TypeOrmModule.forFeature([CatalogState]), ClosureStateModule],
    providers: [CatalogStateService],
    exports: [CatalogStateService]
})
export class CatalogStateModule {}
