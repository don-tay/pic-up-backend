import { Logger } from '@nestjs/common';
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
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  const port = process.env.PORT || 5200;
  const address = '0.0.0.0';
  await app.listen(port, address);
  Logger.log(`Server running. API Docs on http://${address}:${port}/api-doc`);
}
bootstrap().catch((err) => {
  Logger.error(`Unhandled error: ${err}. Shutting down.`);
  process.exit(1);
});
