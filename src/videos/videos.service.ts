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

  // async StreamVideo(name: string, res: Response, req: Request) {
  //   const { range } = req.headers;
  //   if (!range) {
  //     throw new NotFoundException('range not found');
  //   }
  //   const file = statSync(join(process.cwd(), `../files/${name}`));
  //   const parts = range.replace(/bytes=/, '').split('-');
  //   const start = parseInt(parts[0], 10);
  //   const end = parts[1] ? parseInt(parts[1], 10) : file.size - 1;
  //   const chunkSize = end - start + 1;

  //   const headers = {
  //     'Content-Range': `bytes ${start}-${end}/${file.size}`,
  //     'Accept-Ranges': 'bytes',
  //     'Content-Length': chunkSize,
  //     'Content-Type': 'video/mp4',
  //   };
  //   res.writeHead(206, headers);
  //   const videostream = createReadStream(
  //     join(process.cwd(), `../files/${name}`),
  //     { start, end },
  //   );
  //   videostream.pipe(res);
  // }

  async StreamVideos(id: number, res: Response, req: Request) {
    const data = await this.videoRepository.findOneBy({ id });
    if (!data) {
      throw new NotFoundException();
    }
    const { videoUrl } = data;
    const range = req.headers.range;
    const file = statSync(join(process.cwd(), `../files/${videoUrl}`));
    const fileSize = file.size;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;
      const videostream = createReadStream(
        join(process.cwd(), `../files/${videoUrl}`),
        { start, end },
      );
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      videostream.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(206, head);
      createReadStream(join(process.cwd(), `../files/${videoUrl}`)).pipe(res);
    }
  }
}
