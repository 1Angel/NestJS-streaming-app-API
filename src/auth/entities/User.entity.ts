import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './Roles.enum';
import { Exclude } from 'class-transformer';
import { CourseComments } from 'src/course-commments/entities/Course-Comment.entity';
import { VideosComment } from 'src/videos-comments/entities/videos-comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  username: string;

  @Column('text')
  email: string;

  @Exclude()
  @Column('text')
  password: string;

  @Column('text', { default: Role.User })
  roles: Role[];

  @OneToMany(() => CourseComments, (coursecoments) => coursecoments.user)
  courseComments: CourseComments[];

  @OneToMany(() => VideosComment, (videoComments) => videoComments.user)
  videosComments: VideosComment[];

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  Updated: Date;
}
