import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { User, usertSchema } from '../../models/user.schema';
import { Course, courseSchema } from '../../models/course.schema';
import { JwtModule } from '@nestjs/jwt';
import { MailerService } from "../../shared/services/mailer.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PruebaController } from "./controllers/prueba.controller";

@Module({
  controllers: [AuthController,PruebaController],
  exports: [AuthService,JwtModule],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: usertSchema },
      { name: Course.name, schema: courseSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule], // Importa ConfigModule para poder utilizar ConfigService en el factory
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Obtén la secret de JWT desde las variables de entorno
        signOptions: { expiresIn: configService.get<string>('TOKEN_EXPIRE') },
      }),
      inject: [ConfigService], // Inyecta ConfigService en el factory
    }),
  ],
  providers: [AuthService,MailerService],
})
export class AuthModule {}
