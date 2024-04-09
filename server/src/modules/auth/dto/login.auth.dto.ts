import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginAuthDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'The email is required' })
    email:string;
    @ApiProperty()
    @IsNotEmpty({ message: 'The password is required' })
    password:string;
}