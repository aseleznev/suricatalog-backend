import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogModule } from './database/catalog/catalog.module';
import { CatalogStateModule } from './database/catalog-state/catalog-state.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormNamingStrategy } from './common/typeorm-naming-strategy';
import { CatalogClosureModule } from './database/catalog-closure/catalog-closure.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'password',
            database: 'suricatalog_db',
            namingStrategy: new TypeormNamingStrategy(),
            autoLoadEntities: true,
            synchronize: true,
            logging: true,
            dropSchema: true
        }),
        CatalogModule,
        CatalogClosureModule,
        CatalogStateModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
