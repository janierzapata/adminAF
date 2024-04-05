import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, usertSchema } from '../models/user.schema'
import { Course, courseSchema } from '../models/course.schema'
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../utils/Constantes';


@Module({
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
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule { }
