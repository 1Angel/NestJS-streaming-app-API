import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class LoginUserDto{
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(15)
    password: string;
}