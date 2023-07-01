import { Body, ClassSerializerInterceptor, Controller, Get, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './Dtos/CreateUser.dto';
import { LoginUserDto } from './Dtos/LoginUserDto.dto';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from './entities/Roles.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create')
  CreateUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.CreateUser(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  LoginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.LoginUser(loginUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('hola')
  Greeting(@Request() req) {
    console.log(req.user);
    return 'hola que tal';
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('rolles')
  RolesXD(@Request() req) {
    console.log(req.user)
    return 'hola admin';
  }
}
