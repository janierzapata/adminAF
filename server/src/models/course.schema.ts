
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMongoose } from 'mongoose';

import { User } from './user.schema';

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  @Prop()
  name: String;
  @Prop()
  teacher: String;
}
export const courseSchema = SchemaFactory.createForClass(Course);
