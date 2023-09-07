import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Query,
  Param,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './Dtos/Create-Course.dto';
import { PaginationDto } from './Dtos/Pagination.dto';
import { UpdateCourseDto } from './Dtos/UpdateCourse.dto';
import { SearchFilterDto } from './Dtos/SearchFilterDto.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/entities/Roles.enum';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('create')
  CreateCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.Create(createCourseDto);
  }

  @Get()
  FindAll(@Query() paginationDto: PaginationDto) {
    return this.coursesService.FindAll(paginationDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  FindById(@Param('id') id: number) {
    return this.coursesService.FindById(id);
  }
  @Get('all-titulo')
  FindAlltitle(
    @Query() searchFilterDto: SearchFilterDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.coursesService.FindAllByTitle(searchFilterDto, paginationDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('delete/:id')
  DeleteById(@Param('id') id: number) {
    return this.coursesService.DeleteById(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('edit/:id')
  UpdateCourse(
    @Param('id') id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.EditCourse(id, updateCourseDto);
  }
}
