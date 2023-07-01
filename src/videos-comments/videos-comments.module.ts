import { Module } from '@nestjs/common';
import { VideosCommentsService } from './videos-comments.service';
import { VideosCommentsController } from './videos-comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosComment } from './entities/videos-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VideosComment])],
  controllers: [VideosCommentsController],
  providers: [VideosCommentsService],
})
export class VideosCommentsModule {}
