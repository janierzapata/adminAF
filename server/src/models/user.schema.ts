import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMongoose } from 'mongoose';
import { Roles } from '../shared/constants/enums/roles.enum';
import { TypeDocuments } from 'src/shared/constants/enums/type_document.enum';
import {isBoolean} from "class-validator";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  // ** Account information

  @Prop()
  email: String;

  @Prop()
  username: String;

  @Prop()
  password: string;

  // ** Personal information

  @Prop()
  firstname: String;

  @Prop()
  lastname: String;

  @Prop()
  phone: String;

  @Prop()
  phone_emergency: String;

  @Prop()
  document: String;

  @Prop({
    type: String,
    enum: TypeDocuments,
    default: TypeDocuments.CEDULA,
  })
  type_document: TypeDocuments;

  // ** accoun isActive
  @Prop({
    type: Boolean,
    default: false,
  })
  isActive: boolean;

  // ** Role information

  @Prop({
    type: String,
    enum: Roles,
    default: Roles.ESTUDIANTE,
  })
  role: Roles;

  // ** Course information

  @Prop({
    type:
      [
        {
          courseId: SchemaMongoose.Types.ObjectId,
          schedule: SchemaMongoose.Types.ObjectId,
          status: {
            type: String || null,
            enum: ['PROGRESO', 'APROBADO', 'FINALIZADO', 'RETIRADO', null],
            default: null,
          },
          notes:
            [
              {
                note: String,
                description: String,
                createdAt: { type: Date, default: Date.now },
              },
            ] || null,
        },
      ] || null,
  })
  courses: [
    {
      courseId: SchemaMongoose.Types.ObjectId;
      schedule: SchemaMongoose.Types.ObjectId;
      status: String;
      notes: [
        {
          note: String;
          description: String;
          createdAt: Date;
        },
      ];
    },
  ];

  // ** Metadata

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const usertSchema = SchemaFactory.createForClass(User);
