import { Test, TestingModule } from '@nestjs/testing';
import { VideosCommentsController } from './videos-comments.controller';
import { VideosCommentsService } from './videos-comments.service';

describe('VideosCommentsController', () => {
  let controller: VideosCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideosCommentsController],
      providers: [VideosCommentsService],
    }).compile();

    controller = module.get<VideosCommentsController>(VideosCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
