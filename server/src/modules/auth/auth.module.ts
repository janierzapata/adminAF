import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { User, usertSchema } from '../../models/user.schema';
import { Course, courseSchema } from '../../models/course.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from "../../shared/constants/Constantes";

@Module({
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: usertSchema },
      { name: Course.name, schema: courseSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
