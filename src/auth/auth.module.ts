import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {Student, studentSchema} from '../models/student.schema'

@Module({
  imports: [ MongooseModule.forFeature([{ name: Student.name, schema: studentSchema }]) ],
  controllers: [AuthController],
  providers: [AuthService,],
  exports: [AuthService],
})
export class AuthModule {}
