import { Test, TestingModule } from '@nestjs/testing';
import { VideosCommentsService } from './videos-comments.service';

describe('VideosCommentsService', () => {
  let service: VideosCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideosCommentsService],
    }).compile();

    service = module.get<VideosCommentsService>(VideosCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
