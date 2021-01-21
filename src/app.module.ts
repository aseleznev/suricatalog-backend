import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogModule } from './database/catalog/catalog.module';
import { CatalogStateModule } from './database/catalog-state/catalog-state.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormNamingStrategy } from './common/db-naming-strategy/typeorm-naming-strategy';
import { CatalogClosureModule } from './database/catalog-closure/catalog-closure.module';
import { ClosureStateModule } from './database/closure-state/closure-state.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './common/config/configuration';

const env = process.env.NODE_ENV;

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            envFilePath: !env ? '.env' : `.env.${env}`
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('database.host'),
                port: configService.get<number>('database.port'),
                username: configService.get('database.username'),
                password: configService.get('database.password'),
                database: configService.get('database.databaseName'),
                namingStrategy: new TypeormNamingStrategy(),
                autoLoadEntities: true,
                synchronize: true,
                logging: true,
                dropSchema: true
            })
        }),
        CatalogModule,
        CatalogClosureModule,
        CatalogStateModule,
        ClosureStateModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
