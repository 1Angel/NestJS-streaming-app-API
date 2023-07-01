import { Module } from '@nestjs/common';
import { CourseCommmentsService } from './course-commments.service';
import { CourseCommmentsController } from './course-commments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseComments } from './entities/Course-Comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseComments])],
  controllers: [CourseCommmentsController],
  providers: [CourseCommmentsService],
})
export class CourseCommmentsModule {}
