import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './Dtos/CreateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './Dtos/LoginUserDto.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async GeneratedToken(payload: any) {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async CreateUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const create = await this.userRepository.create({
      ...createUserDto,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    const findEmail = await this.userRepository.findOneBy({ email });
    if (findEmail) {
      throw new UnauthorizedException(`the email ${email} already exist`);
    }

    const user = await this.userRepository.save(create);

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    };

    delete user.password;

    return {
      userData: {
        user,
        access_token: await this.GeneratedToken(payload),
      },
    };
  }

  async LoginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedException(`the email ${email} not exist`);
    }

    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException('password dont match');
    }
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    };
    return {
      userData: {
        user,
        access_token: await this.GeneratedToken(payload),
      },
    };
  }
}
