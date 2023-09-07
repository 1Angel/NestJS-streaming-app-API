import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/videos.entity';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [TypeOrmModule.forFeature([Video]), CoursesModule],
  controllers: [VideosController],
  providers: [VideosService],
  exports: [TypeOrmModule.forFeature([Video])]
})
export class VideosModule {}
