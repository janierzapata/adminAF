
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMongoose } from 'mongoose';

import { Student } from './student.schema';

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  @Prop()
  name: String;
  @Prop()
  teacher: String;
  @Prop([{ 
    type: SchemaMongoose.Types.ObjectId, 
    ref: 'Student' 
  }])
  students: Student;
}
