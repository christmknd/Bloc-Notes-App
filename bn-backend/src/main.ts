import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from "helmet";
import {CorsOptions} from "@nestjs/common/interfaces/external/cors-options.interface";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //-----------------------

  //Security

  //CORS
  const corsOptions: CorsOptions = {
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);
  app.use(helmet());


  //-----------------------

  //SWAGGER

  const config = new DocumentBuilder()
    .setTitle('Bloc Notes App')
    .setDescription('The BN API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //-----------------------

  //SERVER
  await app.listen(3000);
}
bootstrap();
