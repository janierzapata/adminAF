import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMongoose } from 'mongoose';
import { Course } from './course.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: String;
  @Prop()
  password: string;
  @Prop()
  firstname: String;
  @Prop()
  lastname: String;
  @Prop()
  email: String;
}

export const usertSchema = SchemaFactory.createForClass(User);
