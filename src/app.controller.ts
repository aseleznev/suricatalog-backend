import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CatalogService } from './database/catalog/catalog.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly catalogService: CatalogService
    ) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('uploadDrugs')
    uploadDrugs(): Promise<void> {
        return this.catalogService.uploadDrugs();
    }
}
