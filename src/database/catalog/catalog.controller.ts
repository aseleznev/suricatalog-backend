import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogDto } from './dto/catalog.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('catalog')
@Controller('catalog')
export class CatalogController {
    constructor(private readonly catalogService: CatalogService) {}

    @Get('root')
    @ApiResponse({ status: 200, description: 'Get toot nodes' })
    getRoot(): Promise<CatalogDto[]> {
        return this.catalogService.getRoot();
    }

    @Get('children/:id')
    @ApiResponse({ status: 200, description: 'Get node children' })
    getChildren(
        @Param('id', new ParseIntPipe()) id: number
    ): Promise<CatalogDto[]> {
        return this.catalogService.getChildren(id);
    }
}
