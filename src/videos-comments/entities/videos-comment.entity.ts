import { User } from 'src/auth/entities/User.entity';
import { Video } from 'src/videos/entities/videos.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class VideosComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @ManyToOne(() => User, (user) => user.videosComments)
  user: User;

  @ManyToOne(() => Video, (video) => video.videoComments)
  videos: Video;

  @CreateDateColumn()
  createdAt: Date;
}
