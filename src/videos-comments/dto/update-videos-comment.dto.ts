import { PartialType } from '@nestjs/mapped-types';
import { CreateVideosCommentDto } from './create-videos-comment.dto';

export class UpdateVideosCommentDto extends PartialType(
  CreateVideosCommentDto,
) {}
