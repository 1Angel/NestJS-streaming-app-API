import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { VideosCommentsService } from './videos-comments.service';
import { CreateVideosCommentDto } from './dto/create-videos-comment.dto';
import { UpdateVideosCommentDto } from './dto/update-videos-comment.dto';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { User } from 'src/auth/entities/User.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('videos-comments')
export class VideosCommentsController {
  constructor(private readonly videosCommentsService: VideosCommentsService) {}

  @UseGuards(AuthGuard)
  @Post('create/:id')
  create(
    @Body() createVideosCommentDto: CreateVideosCommentDto,
    @GetUser() user: User,
    @Param('id') id: number
  ) {
    return this.videosCommentsService.create(createVideosCommentDto, user, id);
  }

  @Get()
  findAll() {
    return this.videosCommentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.videosCommentsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateVideosCommentDto: UpdateVideosCommentDto,
    @GetUser() user: User,
  ) {
    return this.videosCommentsService.update(id, updateVideosCommentDto, user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @GetUser() user: User) {
    return this.videosCommentsService.remove(id, user);
  }
}
