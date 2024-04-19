import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from "@nestjs/config";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  const config = new DocumentBuilder()
    .setTitle('AcademiaSoft')
    .setDescription('The AcademiaSoft API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    const options: SwaggerDocumentOptions =  {
      operationIdFactory: (
        controllerKey: string,
        methodKey: string
      ) => methodKey
    };
  const document = SwaggerModule.createDocument(app, config,options);
  SwaggerModule.setup('api', app, document);

  app.enableCors({origin: true}); // Habilita CORS para todas las rutas
  // app.enableCors({origin: ["http://localhost:5173","*"]}); // Habilita CORS para todas las rutas
  app.listen(PORT).then(() => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
}
bootstrap();
