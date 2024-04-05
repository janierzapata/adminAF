import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = 3000;
  const app = await NestFactory.create(AppModule);
  app.listen(PORT).then(() => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
}
bootstrap();
