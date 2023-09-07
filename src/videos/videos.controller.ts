import {
  Res,
  Req,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  ClassSerializerInterceptor,
  Header,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './Dtos/CreateVideoDto.dto';
import { diskStorage } from 'multer';
import { v4 as uuid4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/entities/Roles.enum';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('upload/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '../files',
        filename: (req, file, cb) => {
          const extension = file.mimetype.split('/')[1];
          const fileName = `${uuid4()}.${extension}`;

          cb(null, fileName);
        },
      }),
    }),
  )
  uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body() createVideoDto: CreateVideoDto,
    @Param('id') id: number
  ) {
    return this.videosService.CreateVideo(file, createVideoDto, id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @Get('/:id')
  videoById(@Param('id') id: number) {
    return this.videosService.VideoById(id);
  }

  // //@UseGuards(AuthGuard)
  // @Get('stream/:name')
  // StreamVideo(
  //   @Param('name') name: string,
  //   @Res() res: Response,
  //   @Req() req: Request,
  // ) {
  //   return this.videosService.StreamVideo(name, res, req);
  // }

  @Get('streamss/:id')
  @Header('Accept-Ranges', 'bytes')
  @Header('Content-Type', 'video/mp4')
  StreamReal(
    @Param('id') id: number,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    return this.videosService.StreamVideos(id, res, req);
  }
}
