import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMongoose } from 'mongoose';
import { Course } from './course.schema';

export type StudentDocument = HydratedDocument<Student>;

@Schema()
export class Student {
  @Prop()
  username: String;
  @Prop()
  password: String;
  @Prop()
  firstName: String;
  @Prop()
  lastName: String;
  @Prop()
  email: String;
  @Prop([
    {
      type: SchemaMongoose.Types.ObjectId,
      ref: 'Course',
    },
  ])
  courses: Course;
}

export const studentSchema = SchemaFactory.createForClass(Student);
