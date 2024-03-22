import { Expose } from 'class-transformer';

export class UploadFileDto {
  @Expose()
  originalname: string;

  @Expose()
  path: string;

  @Expose()
  size: number;
}
