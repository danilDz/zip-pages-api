import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { PagesModule } from './pages/pages.module';
import { DatabaseConfigModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { LoggerService } from './logger/logger.service';
import { AllExceptionFilter } from './common/filters/all-exceptions.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';

@Module({
  imports: [DatabaseConfigModule, LoggerModule, PagesModule],
  providers: [
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    LoggerService,
  ],
})
export class AppModule {}
