import { IsString } from 'class-validator';

export class CreatePageDto {
  @IsString()
  title: string;

  @IsString()
  size: string;

  @IsString()
  path: string;
}
