import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import CreateVehicleDTO from './dto/create-vehicle.dto';
import { UpdateVehicleDTO } from './dto/update-vehicle.dto';
import VehicleService from './vehicle.service';

@ApiTags('Vehicle')
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async getAll() {
    return this.vehicleService.getAll();
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get(':board')
  async showByBoard(
    @Param('board') board: string,
    @Req() request: RequestWithUser,
  ) {
    return this.vehicleService.showByBoard(board);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  @ApiBody({ type: CreateVehicleDTO })
  async create(
    @Body() vehicleData: CreateVehicleDTO,
    @Req() request: RequestWithUser,
  ) {
    return this.vehicleService.create(vehicleData);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put(':board')
  async update(
    @Param('board') board: string,
    @Body() vehicleData: UpdateVehicleDTO,
    @Req() request: RequestWithUser,
  ) {
    return this.vehicleService.update(board, vehicleData);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':board')
  async delete(
    @Param('board') board: string,
    @Req() request: RequestWithUser,
    @Res() response,
  ) {
    this.vehicleService.delete(board);
    return response
      .status(HttpStatus.OK)
      .json({ message: 'Vehicle deleted with success' });
  }
}
