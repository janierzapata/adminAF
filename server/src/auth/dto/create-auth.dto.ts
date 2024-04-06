import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { Roles } from "src/enums/roles.enum";
import { TypeDocuments } from "src/enums/type_document.enum";

export class CreateAuthDto {
    @IsNotEmpty({ message: 'The username is required' })
    @ApiProperty()
    username: String;
    @IsNotEmpty({ message: 'The password is required' })
    @Length(6, 20, { message: 'Password must be between 8 and 20 characters' })
    @ApiProperty()
    password?: string;
    @ApiProperty()
    firstname: String;
    @ApiProperty()
    lastname: String;
    @ApiProperty()
    @IsEmail({}, { message: 'The email must be in a valid format' })
    email: String;
    @ApiProperty()
    phone: String;
    @ApiProperty()
    phone_emergency: String;
    @ApiProperty()
    document: String;
    @ApiProperty({ enum: ['TI', 'CC', 'CE'] })
    type_document: TypeDocuments;
    @ApiProperty({
        enum: [
            'ADMIN',
            'ESTUDIANTE',
            'DOCENTE'
        ]})
    role: Roles;
}
