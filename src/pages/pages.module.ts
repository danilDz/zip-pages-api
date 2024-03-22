import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { PagesRepository } from './pages.repository';
import { Page } from './entity/page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  controllers: [PagesController],
  providers: [PagesService, PagesRepository],
})
export class PagesModule {}
