import { User } from 'src/auth/entities/User.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Course } from '../../courses/entity/Courses.entity';

@Entity()
export class CourseComments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @ManyToOne(() => User, (user) => user.courseComments)
  user: User;

  @ManyToOne(() => Course, (course) => course.courseComents)
  course: Course;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  Updated: Date;
}
