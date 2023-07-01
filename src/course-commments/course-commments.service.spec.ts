import { Test, TestingModule } from '@nestjs/testing';
import { CourseCommmentsService } from './course-commments.service';

describe('CourseCommmentsService', () => {
  let service: CourseCommmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseCommmentsService],
    }).compile();

    service = module.get<CourseCommmentsService>(CourseCommmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
