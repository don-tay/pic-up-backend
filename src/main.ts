import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // setup swagger
  const config = new DocumentBuilder()
    .setTitle('Pic-Up Backend')
    .setDescription('Pic-Up API spec')
    .setVersion('latest')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const port = configService.get<number>('PORT')!;
  const address = '0.0.0.0';
  await app.listen(port, address);
  Logger.log(`Server running. API Docs on http://${address}:${port}/api-doc`);
}

bootstrap().catch((err) => {
  Logger.error(`Unhandled error: ${err}. Shutting down.`);
  process.exit(1);
});
