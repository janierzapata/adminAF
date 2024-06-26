import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
