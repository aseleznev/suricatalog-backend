import { Module } from '@nestjs/common';
import { ClosureStateService } from './closure-state.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClosureState } from './closure-state.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ClosureState])],
    providers: [ClosureStateService],
    exports: [ClosureStateService]
})
export class ClosureStateModule {}
