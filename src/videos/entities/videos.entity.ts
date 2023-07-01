import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Course } from '../../courses/entity/Courses.entity';
import { VideosComment } from 'src/videos-comments/entities/videos-comment.entity';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  videoUrl: string;

  @ManyToOne(() => Course, (course) => course.videos)
  course: Course;

  @OneToMany(() => VideosComment, (videoComment) => videoComment.videos)
  videoComments: VideosComment[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
