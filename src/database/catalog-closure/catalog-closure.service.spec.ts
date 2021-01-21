import { Test, TestingModule } from '@nestjs/testing';
import { CatalogClosureService } from './catalog-closure.service';

describe('CatalogClosureService', () => {
    let service: CatalogClosureService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CatalogClosureService]
        }).compile();

        service = module.get<CatalogClosureService>(CatalogClosureService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
