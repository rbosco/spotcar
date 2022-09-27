import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import * as moment from 'moment';
import CompanyService from '../company/company.service';
import VehicleService from '../vehicle/vehicle.service';
import CreateParkDTO from './dto/create-park.dto';
import { DeleteParkDTO } from './dto/delete-park.dto';
import { UpdateParkDTO } from './dto/update-park.dto';
import Park from './park.entity';
import { ParkRepository } from './park.repository';

@Injectable()
export class ParkService {
  constructor(
    @InjectRepository(ParkRepository)
    private readonly parkRepository: ParkRepository,
    @Inject(VehicleService)
    private readonly vehicleService: VehicleService,
    @Inject(CompanyService)
    private readonly companyService: CompanyService,
  ) {}

  async getVehicleInPark(id: number): Promise<Park>{
    return await this.parkRepository.getVehicleInPark(id);
  }

  async registerIn(parkData: CreateParkDTO):Promise<Park> {
    const vehicle = await this.vehicleService.showByBoard(parkData.board);
    if(!vehicle){
        throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
    }

    const vehicleInPark = await this.getVehicleInPark(vehicle.id);
    if(!vehicleInPark){
        throw new HttpException('Vehicle already did register in the park',HttpStatus.NOT_FOUND);
    }
    
    const park = await this.parkRepository.create({companyId: parkData.companyId, vehicleId: vehicle.id, updated_at: null});
    await park.save();
    return park;
  }

  async registerOut(parkData: UpdateParkDTO): Promise<Park> {
    const vehicle = await this.vehicleService.showByBoard(parkData.board);
    if(!vehicle){
        throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
    }

    const company = await this.companyService.showById(parkData.companyId);
    if(!company){
        throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }

    await this.parkRepository.update({vehicleId: vehicle.id},{updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')});
    const park = await this.parkRepository.findOneBy({vehicleId: vehicle.id});
    return park;
  }

  async delete(parkData: DeleteParkDTO){
    const vehicle = await this.vehicleService.showByBoard(parkData.board);
    if(!vehicle){
        throw new HttpException('Vehicle not found',HttpStatus.NOT_FOUND);
    }
    
    const park = await this.parkRepository.softDelete({vehicleId: vehicle.id});
    if(!park.affected){
        throw new HttpException('Vehicle did not found in the park', HttpStatus.NOT_FOUND);
    }

    return response.status(HttpStatus.OK).json({'message':'Vehicle removed in the park with success'});
  }
}

export default ParkService;
