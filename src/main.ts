import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { environment } from '@common/environment';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import express from 'express';
import RateLimit from 'express-rate-limit';
import { Logger } from '@nestjs/common';
import { AllExceptionsFilter } from '@common/global-exceptions-filter/all-exceptions.filter';
import { useContainer } from 'class-validator';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { getFromContainer, MetadataStorage } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.setGlobalPrefix('/api/v1');
  const env = environment();
  const port: number = env.serverPort;
  const siteUrl: string = env.siteUrl;

  app.enableCors();
  app.use(cookieParser());
  app.use(express.json());

  if (env.isProduction) {
    app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    app.use(compression());
    app.use(helmet());

    app.use(
      RateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      }),
    );
  }
  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      validationError: {
        target: false,
      },
    }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  //Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Pro Traders Fund REST API')
    .setDescription('Rest APIs for Pro Traders Fund ')
    .setVersion('1.0')
    .addTag('ptf')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // Creating all the swagger schemas based on the class-validator decorators
  const metadata = (getFromContainer(MetadataStorage) as any)
    .validationMetadatas;
  document.components.schemas = Object.assign(
    {},
    document.components.schemas || {},
    validationMetadatasToSchemas(metadata),
  );

  SwaggerModule.setup('api', app, document, {
    swaggerUrl: `/api-json`,
  });

  SwaggerModule.setup('explorer', app, document);

  await app.listen(port, () => {
    Logger.log(`Server is running at ${port}`);
  });
}
bootstrap();
