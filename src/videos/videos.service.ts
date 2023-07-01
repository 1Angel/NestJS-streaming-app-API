import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream, statSync } from 'fs';
import { Repository } from 'typeorm';
import { Video } from './entities/videos.entity';
import { CreateVideoDto } from './Dtos/CreateVideoDto.dto';
import { join } from 'path';
import { Request, Response } from 'express';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
  ) {}

  async CreateVideo(file: Express.Multer.File, createVideoDto: CreateVideoDto) {
    const video = await this.videoRepository.create({
      ...createVideoDto,
      videoUrl: file.filename,
    });

    return this.videoRepository.save(video);
  }

  async VideoById(id: number) {
    const video = await this.videoRepository.findOne({
      where: {
        id: id,
      },
      order: {
        videoComments: {
          id: 'ASC',
        },
      },
      relations: {
        videoComments: {
          user: true,
        },
      },
    });
    if (!video) {
      throw new NotFoundException(`video with the id ${id} not found`);
    }
    return video;
  }

  async StreamVideo(name: string, res: Response, req: Request) {
    const { range } = req.headers;
    if (!range) {
      throw new NotFoundException('range not found');
    }
    const file = statSync(join(process.cwd(), `../files/${name}`));
    const chunksize = 1 * 1e6;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + chunksize, file.size - 1);
    const videoLength = end - start + 1;

    const headers = {
      'Content-Range': `bytes ${start}-${end}/${file.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': videoLength,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, headers);
    const videostream = createReadStream(
      join(process.cwd(), `../files/${name}`),
      { start, end },
    );
    videostream.pipe(res);
  }
}
