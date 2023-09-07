import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CourseCommmentsService } from './course-commments.service';
import { CreateCourseCommentDto } from './Dtos/create-courseComment.dto';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { User } from 'src/auth/entities/User.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { EditCommentDto } from './Dtos/edit-courseComment.dto';

@Controller('course-commments')
export class CourseCommmentsController {
  constructor(
    private readonly courseCommmentsService: CourseCommmentsService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('create/:id')
  CreateComment(
    @Param('id') id: number,
    @Body() createCourseCommentDto: CreateCourseCommentDto,
    @GetUser() user: User,
  ) {
    return this.courseCommmentsService.Create(id, createCourseCommentDto, user);
  }

  @UseGuards(AuthGuard)
  @Put('edit/:id')
  EditComment(
    @Body() editCommentDto: EditCommentDto,
    @GetUser() user: User,
    @Param('id') id: number,
  ) {
    return this.courseCommmentsService.EditComment(editCommentDto, user, id);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  DeleteComment(@Param('id') id: number, @GetUser() user: User) {
    return this.courseCommmentsService.DeleteComment(id, user);
  }
}
