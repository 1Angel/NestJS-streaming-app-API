import { IsString } from 'class-validator';

export class EditCommentDto {
  @IsString()
  description: string;
}
