import { Test, TestingModule } from '@nestjs/testing';
import { CatalogStateService } from './catalog-state.service';

describe('CatalogStateService', () => {
    let service: CatalogStateService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CatalogStateService]
        }).compile();

        service = module.get<CatalogStateService>(CatalogStateService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
