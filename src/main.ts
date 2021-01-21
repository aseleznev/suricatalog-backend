import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { QueryFailedExceptionFilter } from './common/filters/query-failed-exception.filter';
import {
    FastifyAdapter,
    NestFastifyApplication
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: true })
    );

    app.setGlobalPrefix('api');
    app.useGlobalFilters(new QueryFailedExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());

    const options = new DocumentBuilder()
        .setTitle('Suricatalog')
        .setDescription('Suricatalog API description')
        .setVersion('1.0')
        .addApiKey({ type: 'apiKey' }, 'apiKey')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/swagger', app, document);

    const configService = app.get(ConfigService);
    const port = configService.get('port');

    await app.listen(port);
}
bootstrap();
