import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { Repository } from 'typeorm';
import CreateVehicleDTO from './dto/create-vehicle.dto';
import { UpdateVehicleDTO } from './dto/update-vehicle.dto';
import Vehicle from './vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async getAll(): Promise<Vehicle[]> {
    const vehicles = await this.vehicleRepository.find();
    return vehicles;
  }

  async showByBoard(board: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOneBy({ board });
    if (!vehicle) {
      throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
    }

    return vehicle;
  }

  async create(vehicleData: CreateVehicleDTO): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.create(vehicleData);
    await vehicle.save();
    return vehicle;
  }

  async update(board: string, vehicleData: UpdateVehicleDTO): Promise<Vehicle> {
    await this.vehicleRepository.update({ board: board }, vehicleData);
    const vehicle = await this.vehicleRepository.findOneBy({ board });
    if (!vehicle) {
      throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
    }
    return vehicle;
  }

  async delete(board: string) {
    const vehicle = await this.vehicleRepository.delete({ board: board });
    if (!vehicle.affected) {
      throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
    }

    return response
      .status(HttpStatus.OK)
      .json({ message: 'Vehicle deleted with success' });
  }
}

export default VehicleService;
