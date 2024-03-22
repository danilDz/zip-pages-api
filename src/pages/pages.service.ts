import { Injectable } from '@nestjs/common';
import { PagesRepository } from './pages.repository';
import { CreatePageDto } from './dto/create-page.dto';
import { GetManyPagesDto } from './dto/get-many-pages.dto';
import { KB, MB, GB } from 'src/constants';

@Injectable()
export class PagesService {
  constructor(private readonly pagesRepository: PagesRepository) {}

  async createPage(pageDto: CreatePageDto) {
    const bytes = parseInt(pageDto.size);
    const size =
      bytes >= 1000
        ? Math.ceil(bytes / KB) >= 1000
          ? Math.ceil(bytes / MB) >= 1000
            ? `${Math.ceil(bytes / GB)} GB`
            : `${Math.ceil(bytes / MB)} MB`
          : `${Math.ceil(bytes / KB)} KB`
        : `${bytes} B`;
    return await this.pagesRepository.createPage({ ...pageDto, size });
  }

  async getManyPages(getPages: GetManyPagesDto) {
    const pagesList = await this.pagesRepository.getManyPages(getPages);
    const count = await this.pagesRepository.getPagesCount();
    return { pagesList, count };
  }
}
