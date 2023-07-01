import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Video } from '../../videos/entities/videos.entity';
import { CourseComments } from '../../course-commments/entities/Course-Comment.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @OneToMany(() => Video, (video) => video.course)
  videos: Video[];

  @OneToMany(() => CourseComments, (coursecomments) => coursecomments.course)
  courseComents: CourseComments[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
