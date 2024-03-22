import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/storage.config';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { GetManyPagesDto } from './dto/get-many-pages.dto';
import { UploadFileDto } from './dto/upload-file.dto';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get('/get-many')
  async getPages(@Query() query: GetManyPagesDto) {
    return await this.pagesService.getManyPages(query);
  }

  @Post('/create')
  async createPage(@Body() body: CreatePageDto) {
    return await this.pagesService.createPage(body);
  }

  @Post('/upload-file')
  @Serialize(UploadFileDto)
  @UseInterceptors(FileInterceptor('file', { storage }))
  async uploadFile(@UploadedFile() file) {
    return file;
  }
}
