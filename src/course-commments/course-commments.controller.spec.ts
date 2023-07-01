import { Test, TestingModule } from '@nestjs/testing';
import { CourseCommmentsController } from './course-commments.controller';
import { CourseCommmentsService } from './course-commments.service';

describe('CourseCommmentsController', () => {
  let controller: CourseCommmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseCommmentsController],
      providers: [CourseCommmentsService],
    }).compile();

    controller = module.get<CourseCommmentsController>(CourseCommmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
