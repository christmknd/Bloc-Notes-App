import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from "helmet";
import * as csurf from 'csurf';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Security

  app.enableCors();
  app.use(helmet());
  app.use(csurf());


  //Swagger

  const config = new DocumentBuilder()
    .setTitle('Bloc Notes App')
    .setDescription('The BN API description')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //Security
  await app.listen(3000);
}
bootstrap();
