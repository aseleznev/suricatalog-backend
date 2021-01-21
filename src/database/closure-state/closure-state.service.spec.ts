import { Test, TestingModule } from '@nestjs/testing';
import { ClosureStateService } from './closure-state.service';

describe('ClosureStateService', () => {
    let service: ClosureStateService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ClosureStateService]
        }).compile();

        service = module.get<ClosureStateService>(ClosureStateService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
