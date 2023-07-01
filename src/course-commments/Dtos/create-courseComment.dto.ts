import { IsOptional, IsString } from 'class-validator';
import { Course } from 'src/courses/entity/Courses.entity';

export class CreateCourseCommentDto {
  @IsString()
  description: string;

  course: Course;
}
