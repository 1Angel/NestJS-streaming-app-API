import { Module } from '@nestjs/common';
import { CourseCommmentsService } from './course-commments.service';
import { CourseCommmentsController } from './course-commments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseComments } from './entities/Course-Comment.entity';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [TypeOrmModule.forFeature([CourseComments]), CoursesModule],
  controllers: [CourseCommmentsController],
  providers: [CourseCommmentsService],
})
export class CourseCommmentsModule {}
