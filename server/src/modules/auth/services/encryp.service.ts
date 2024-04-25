import {Injectable} from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class EncrypService {
    async encrypPassword(password: string) {
        return bcrypt.hash(password, 10);
    }

    async comparePassword(password, userPassword){
        return bcrypt.compareSync(password, userPassword);
    }

}