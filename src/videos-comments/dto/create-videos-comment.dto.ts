import { IsString } from 'class-validator';
import { Video } from 'src/videos/entities/videos.entity';

export class CreateVideosCommentDto {
  @IsString()
  description: string;

  videos: Video;
}
