import { IsNotEmpty, IsString } from 'class-validator';
import { Course } from '../../courses/entity/Courses.entity';

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  videoUrl: string;
}
