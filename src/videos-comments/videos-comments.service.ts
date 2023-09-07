import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateVideosCommentDto } from './dto/create-videos-comment.dto';
import { UpdateVideosCommentDto } from './dto/update-videos-comment.dto';
import { User } from 'src/auth/entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { VideosComment } from './entities/videos-comment.entity';
import { Repository } from 'typeorm';
import { Video } from 'src/videos/entities/videos.entity';

@Injectable()
export class VideosCommentsService {
  constructor(
    @InjectRepository(VideosComment)
    readonly videoCommentRepository: Repository<VideosComment>,

    @InjectRepository(Video)
    readonly videoRepository: Repository<Video>,
  ) {}

  async create(
    createVideosCommentDto: CreateVideosCommentDto,
    user: User,
    id: number,
  ) {
    const videoId = await this.videoRepository.findOneBy({ id });

    if (!videoId) {
      throw new NotFoundException();
    }

    const create = this.videoCommentRepository.create({
      ...createVideosCommentDto,
      user: user,
      videos: videoId
    });

    const save = await this.videoCommentRepository.save(create);
    return save;
  }

  findAll() {
    const all = this.videoCommentRepository.find();
    return all;
  }

  async findOne(id: number) {
    const byid = await this.videoCommentRepository.findOneBy({ id });
    return byid;
  }

  async update(
    id: number,
    updateVideosCommentDto: UpdateVideosCommentDto,
    user: User,
  ) {
    const videocomment = await this.videoCommentRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
      },
    });

    if (videocomment.user.id !== user.id) {
      throw new UnauthorizedException();
    }
    if (!videocomment) {
      throw new NotFoundException();
    }
    const edit = await this.videoCommentRepository.update(
      id,
      updateVideosCommentDto,
    );
    return edit;
  }

  async remove(id: number, user: User) {
    const videocomment = await this.videoCommentRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
      },
    });

    if (!videocomment) {
      throw new NotFoundException();
    }

    if (videocomment.user.id !== user.id) {
      throw new UnauthorizedException();
    }

    const remove = await this.videoCommentRepository.remove(videocomment);
    return {
      StatusCode: HttpStatus.OK,
    };
  }
}
