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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
import RequestWithUser from '../auth/requestWithUser.interface';
import CompanyService from './company.service';
import { CreateCompanyDTO } from './dto/create-company.dto';
import ShowQueryDTO from './dto/show-query.dto';
import { UpdateCompanyDTO } from './dto/update-company.dto';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async getAll(@Req() request: RequestWithUser) {
    return this.companyService.getAll();
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get('qt_in_out_all_company')
  async getCountInOutPark(@Req() request: RequestWithUser){
    return this.companyService.getCountInOutPark();
  }
  
  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get('qt_in_out_per_hour_all')
  async getCountInOutParkPerHour(@Req() request: RequestWithUser){
    return this.companyService.getCountInOutParkPerHour();
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get('report/qt_vehicle_park_in_per_period/:cnpj')
  async getCountVehicleParkInPerPeriodByCnpj(
    @Param('cnpj') cnpj: string,
    @Query() showQueryDTO: ShowQueryDTO,
    @Req() request: RequestWithUser){
      return this.companyService.getCountVehicleParkInPerPeriodByCnpj(cnpj,showQueryDTO);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get('report/frequency_vehicle_company/:cnpj')
  async getFrequencyVehicleCompanyByCnpj(
    @Param('cnpj') cnpj: string,
    @Req() request: RequestWithUser){
      return this.companyService.getFrequencyVehicleCompanyByCnpj(cnpj);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  async show(@Param('id') id: number, @Req() request: RequestWithUser) {
    return this.companyService.showById(+id);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Get('qt_in_out/:cnpj')
  async getCountInOutParkByCnpj(@Param('cnpj') cnpj: string, @Req() request: RequestWithUser){
    return this.companyService.getCountInOutParkByCnpj(cnpj);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  @ApiBody({ type: CreateCompanyDTO })
  async create(
    @Body() companyData: CreateCompanyDTO,
    @Req() request: RequestWithUser,
  ) {
    return this.companyService.create(companyData);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCompany: UpdateCompanyDTO,
    @Req() request: RequestWithUser,
  ) {
    return this.companyService.update(+id, updateCompany);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @Req() request: RequestWithUser,
    @Res() response,
  ) {
    this.companyService.delete(+id);
    return response
      .status(HttpStatus.OK)
      .json({ message: 'Company deleted with success!' });
  }
}
