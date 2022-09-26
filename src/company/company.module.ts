import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './company.controller';
import Company from './company.entity';
import { CompanyRepository } from './company.repository';
import CompanyService from './company.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [CompanyRepository,CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
