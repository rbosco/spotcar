import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from 'src/company/company.module';
import { VehicleModule } from 'src/vehicle/vehicle.module';
import { ParkController } from './park.controller';
import Park from './park.entity';
import { ParkRepository } from './park.repository';
import ParkService from './park.service';

@Module({
  imports: [TypeOrmModule.forFeature([Park]), VehicleModule, CompanyModule],
  controllers: [ParkController],
  providers: [ParkRepository,ParkService],
  exports: [ParkService],
})
export class ParkModule {}
