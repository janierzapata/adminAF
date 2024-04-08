import { ApiProperty } from "@nestjs/swagger";
import { Roles } from "src/shared/constants/enums/roles.enum";

export class UserAuthDto {
    @ApiProperty()
    username:String;
    @ApiProperty()
    firstName:String;
    @ApiProperty()
    lastName:String;
    @ApiProperty()
    email:String;
    @ApiProperty()
    token?:string;
    @ApiProperty()
    rol?:Roles;
}
