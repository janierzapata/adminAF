import { Model } from 'mongoose';
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from '../models/user.schema';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login.auth.dto';
import { UserAuthDto } from './dto/user-auth.dto';
import { JwtService } from '@nestjs/jwt'
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private studentModel: Model<User>,
  ) { }

  async register(createAuthDto: CreateAuthDto): Promise<void> {
    const username = createAuthDto.username;
    const user = await this.studentModel.findOne({ username }).exec();
    if (user) {
      throw new InternalServerErrorException('The username already exists');
    }
    createAuthDto.password = await bcrypt.hash(createAuthDto.password, 10);
    const createUser = new this.studentModel({ ...createAuthDto });
    await createUser.save();
  }

  async login(loginAuthDto: LoginAuthDto) {
    const username = loginAuthDto.username;
    const user = await this.studentModel.findOne({ username }).exec();

    if (user) {
      if (await bcrypt.compare(loginAuthDto.password, user.password)) {

        const payload = { sub: user._id, username: user.username };
        const userDto: UserAuthDto = {
          username: user.username,
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
          rol: user.role,
          token: await this.jwtService.signAsync(payload)
        };
        return userDto;
      }
      throw new UnauthorizedException();
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
