import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class SearchFilterDto {
  @IsString()
  @IsOptional()
  @Type(() => String)
  title?: string;
}
