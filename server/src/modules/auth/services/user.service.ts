import {Injectable, InternalServerErrorException, UnauthorizedException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../../../models/user.schema";
import {Model} from "mongoose";
import {CreateAuthDto} from "../dto/create-auth.dto";
import {EncrypService} from "./encryp.service";

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private studentModel: Model<User>,
        private encrypService: EncrypService
    ) {
    }

    async createUser(createAuthDto: CreateAuthDto) {
        const email = createAuthDto.email;
        const user = await this.findByEmail(email.toString());
        if (user) {
            throw new InternalServerErrorException("The email already exists");
        }
        createAuthDto.password = await this.encrypService.encrypPassword(createAuthDto.password);
        const createUser = new this.studentModel({...createAuthDto});
        return await createUser.save();
    }

    async validateUser(email: string, password: string) {
        const user = await this.findByEmail(email);
        if (user) {
            const isMatch: boolean = await this.encrypService.comparePassword(password, user.password)
            if (isMatch) {
                if (!user.isActive) {
                    throw new UnauthorizedException('The account is not activated');
                }
                return user;
            }
        }
        throw new UnauthorizedException("User o password is wrong");
    }

    async findByEmail (email:string){
        return await this.studentModel.findOne({email}).exec();
    }

    async activateAccount(userId: string): Promise<void> {
        await this.studentModel.updateOne({_id: userId}, {isActive: true}).exec();
    }
}