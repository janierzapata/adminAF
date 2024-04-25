import {BadRequestException, Injectable} from "@nestjs/common";
import {CreateAuthDto} from "../dto/create-auth.dto";
import {LoginAuthDto} from "../dto/login.auth.dto";
import {UserAuthDto} from "../dto/user-auth.dto";
import {JwtService} from "@nestjs/jwt";
import {MailerService} from "../../../shared/services/mailer.service";
import {UserService} from "./user.service";


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private readonly mailer: MailerService,
        private userService: UserService
    ) {
    }

    async register(createAuthDto: CreateAuthDto): Promise<void> {
        const user = await this.userService.createUser(createAuthDto);
        await this.sendVerificationEmail(user._id,user.email.toString());
    }
    async resendVerificationEmail(email:string){
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new BadRequestException('User not found');
        }
        if (user.isActive){
            throw new BadRequestException('The account is already verified');
        }
        return await this.sendVerificationEmail(user._id,user.email.toString());
    }
    async sendVerificationEmail(userId:any, email: string) {
        const verificationToken = await this.generateToken(userId, email);
        const verificationLink = `http://localhost:3000/auth/verify?token=${verificationToken}`;
        await this.mailer.sendEmail(email, 'Verificacion Correo', verificationLink);
        return {message: 'Verification email sent'};
    }

    async login(loginAuthDto: LoginAuthDto) {
        const user = await this.userService.validateUser(loginAuthDto.email, loginAuthDto.password);
        const userDto: UserAuthDto = {
            id: user._id,
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,
            rol: user.role,
            token: await this.generateToken(user._id, user.email)
        };
        return userDto;
    }

    verificationToken(token: string) {
        const decodedToken = this.verifyToken(token);
        const userId = decodedToken.sub;
        this.userService.activateAccount(userId)
        return {message: '¡Successfully verified account!'};
    }

    verifyToken(token: string) {
        return this.jwtService.verify(token, {
            secret: process.env.JWT_SECRET,
        });
    }

    async generateToken(id: any, email: String) {
        const payload = {sub: id, email: email};
        return this.jwtService.signAsync(payload)
    }

    findOne(id: number) {
        return `This action returns a #${id} auth`;
    }

    update(id: number) {

        return `This action updates a #${id} auth`;
    }

    remove(id: number) {
        return `This action removes a #${id} auth`;
    }
}
