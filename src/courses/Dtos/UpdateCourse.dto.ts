import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
