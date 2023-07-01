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

@Injectable()
export class VideosCommentsService {
  constructor(
    @InjectRepository(VideosComment)
    readonly videoCommentRepository: Repository<VideosComment>,
  ) {}

  async create(createVideosCommentDto: CreateVideosCommentDto, user: User) {
    const create = this.videoCommentRepository.create({
      ...createVideosCommentDto,
      user: user,
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
