import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('RPG Game Management System')
    .setDescription('API for managing RPG characters and magical items. Includes detailed examples and error handling.')
    .setVersion('1.0')
    .addTag('Characters', 'Endpoints for managing RPG characters')
    .addTag('Magical Items', 'Endpoints for managing magical items')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
