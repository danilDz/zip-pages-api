import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from './entity/page.entity';
import { CreatePageDto } from './dto/create-page.dto';
import { GetManyPagesDto } from './dto/get-many-pages.dto';

@Injectable()
export class PagesRepository {
  constructor(
    @InjectRepository(Page)
    private readonly pageEntityRepository: Repository<Page>,
  ) {}

  async createPage(pageDto: CreatePageDto): Promise<Page> {
    const page = this.pageEntityRepository.create({ ...pageDto });
    return await this.pageEntityRepository.save(page);
  }

  async getManyPages(getPages: GetManyPagesDto): Promise<Page[]> {
    return await this.pageEntityRepository
      .createQueryBuilder()
      .orderBy(getPages.sortField, getPages.sortOrder)
      .skip(getPages.offset)
      .take(getPages.limit)
      .getMany();
  }

  async getPagesCount(): Promise<number> {
    return await this.pageEntityRepository.count();
  }
}
