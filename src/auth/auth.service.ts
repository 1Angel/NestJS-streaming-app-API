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

    const save = await this.userRepository.save(create);

    const payload = {
      id: save.id,
      username: save.username,
      email: save.email,
      roles: save.roles,
    };

    delete save.password;

    return {
      ...save,
      access_token: await this.GeneratedToken(payload),
    };
  }

  async LoginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const findEmail = await this.userRepository.findOneBy({ email });
    if (!findEmail) {
      throw new UnauthorizedException(`the email ${email} not exist`);
    }

    const comparePassword = bcrypt.compareSync(password, findEmail.password);
    if (!comparePassword) {
      throw new UnauthorizedException('password dont match');
    }
    const payload = {
      id: findEmail.id,
      username: findEmail.username,
      email: findEmail.email,
      roles: findEmail.roles,
    };
    return {
      findEmail,
      access_token: await this.GeneratedToken(payload),
    };
  }
}
