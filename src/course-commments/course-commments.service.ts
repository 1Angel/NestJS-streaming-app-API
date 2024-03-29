import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCourseCommentDto } from './Dtos/create-courseComment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseComments } from './entities/Course-Comment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/User.entity';
import { EditCommentDto } from './Dtos/edit-courseComment.dto';
import { Course } from 'src/courses/entity/Courses.entity';

@Injectable()
export class CourseCommmentsService {
  constructor(
    @InjectRepository(CourseComments)
    readonly courseCommentRepository: Repository<CourseComments>,

    @InjectRepository(Course)
    readonly courseRepository: Repository<Course>,
  ) {}

  async Create(
    id: number,
    createCourseCommentDto: CreateCourseCommentDto,
    user: User,
  ) {
    const courseid = await this.courseRepository.findOneBy({ id });
    if (!courseid) {
      throw new NotFoundException();
    }

    const comments = await this.courseCommentRepository.create({
      ...createCourseCommentDto,
      user: user,
      course: courseid,
    });

    const save = await this.courseCommentRepository.save(comments);

    return save;
  }

  async EditComment(editCommentDto: EditCommentDto, user: User, id: number) {
    const editComment = await this.courseCommentRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
      },
    });

    if (editComment.user.id !== user.id) {
      throw new UnauthorizedException();
    }

    if (!editComment) {
      throw new UnauthorizedException();
    }

    const update = await this.courseCommentRepository.update(
      id,
      editCommentDto,
    );
    return update;
  }

  async DeleteComment(id: number, user: User) {
    const comment = await this.courseCommentRepository.findOne({
      where: {
        id: id,
      },
      // loadRelationIds: true,
      relations: {
        user: true,
      },
    });
    if (comment.user.id !== user.id) {
      throw new UnauthorizedException();
    }

    if (!comment) {
      throw new NotFoundException();
    }
    const remove = await this.courseCommentRepository.remove(comment);
    return {
      StatusCode: HttpStatus.OK,
    };
  }
}
