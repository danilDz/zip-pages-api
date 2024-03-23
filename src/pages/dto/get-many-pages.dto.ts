import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class GetManyPagesDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  offset: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  limit: number;

  @IsString()
  sortField: 'title' | 'size';

  @IsString()
  sortOrder: 'ASC' | 'DESC';
}
