import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entity/Courses.entity';
import { Like, Repository, ILike } from 'typeorm';
import { CreateCourseDto } from './Dtos/Create-Course.dto';
import { PaginationDto } from './Dtos/Pagination.dto';
import { UpdateCourseDto } from './Dtos/UpdateCourse.dto';
import { SearchFilterDto } from './Dtos/SearchFilterDto.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    readonly CourseRepository: Repository<Course>,
  ) {}

  async Create(createCourseDto: CreateCourseDto) {
    const create = await this.CourseRepository.create(createCourseDto);

    return this.CourseRepository.save(create);
  }

  async FindAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    const all = await this.CourseRepository.find({
      order: {
        id: 'ASC',
      },
      skip: offset,
      take: limit,
    });
    return all;
  }

  async FindById(id: number) {
    const course = await this.CourseRepository.findOne({
      where: { id: id },
      relations: {
        videos: true,
        courseComents: {
          user: true,
        },
      },
    });
    if (!course) {
      throw new NotFoundException(`Course with the id ${id} not found`);
    } else {
      return course;
    }
  }

  async DeleteById(id: number) {
    const course = await this.CourseRepository.findOneBy({ id });
    if (!course) {
      throw new NotFoundException(`Course with the id ${id} not found`);
    }
    const deleteid = this.CourseRepository.remove(course);
  }

  async EditCourse(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.CourseRepository.findOneBy({ id });

    if (!course) {
      throw new NotFoundException(`Course with the id ${id} not found`);
    }
    const update = await this.CourseRepository.update(id, updateCourseDto);
    return update;
  }

  FindAllByTitle(
    searchFilterDto: SearchFilterDto,
    paginationDto: PaginationDto,
  ) {
    const { limit, offset } = paginationDto;
    const { title } = searchFilterDto;

    const course = this.CourseRepository.find({
      take: limit,
      skip: offset,
      where: [
        {
          title: Like(`%${title}%`),
        },
      ],
    });

    if (!course) {
      throw new NotFoundException();
    }
    return course;
  }
}
