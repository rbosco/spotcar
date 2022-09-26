import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Company from './company.entity';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { ShowQueryDTO } from './dto/show-query.dto';
import { UpdateCompanyDTO } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyRepository)
    private readonly companyRepository: CompanyRepository,
  ) {}

  async getAll(): Promise<Company[]> {
    const companies = await this.companyRepository.find();
    return companies;
  }

  async showById(id: number): Promise<Company> {
    const company = await this.companyRepository.findOneBy({ id });
    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
    return company;
  }

  async create(companyData: CreateCompanyDTO): Promise<Company> {
    const company = this.companyRepository.create(companyData);
    await company.save();
    return company;
  }

  async update(id: number, companyData: UpdateCompanyDTO): Promise<Company> {
    await this.companyRepository.update(id, companyData);
    const company = await this.companyRepository.findOneBy({ id });
    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
    return company;
  }

  async delete(id: number) {
    const company = await this.companyRepository.delete(id);
    if (!company.affected) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
  }

  async getCountInOutPark(): Promise<any[]>{
    return await this.companyRepository.getCountInOutPark();
  }

  async getCountInOutParkByCnpj(cnpj : string): Promise<void>{
    return await this.companyRepository.getCountInOutParkByCnpj(cnpj);
  }

  async getCountInOutParkPerHour(): Promise<any[]>{
    const countInPark = await this.companyRepository.getCountInParkPerHour();
    const countOutPark = await this.companyRepository.getCountOutParkPerHour();
    let output = [];
    countInPark.forEach(item => {
      let hasDuplicateCnpj = countOutPark.find(out => out.cnpj === item.cnpj);
      if(hasDuplicateCnpj){
        output.push({...item, qty_out: hasDuplicateCnpj.qty_out});
      }else{
        output.push({...item});
      }
    });

    return output;
  }

  async getCountVehicleParkInPerPeriodByCnpj(cnpj: string, showQueryDTO:ShowQueryDTO): Promise<any[]>{
    return await this.companyRepository.getCountVehicleParkInPerPeriodByCnpj(cnpj, showQueryDTO);
  }

  async getFrequencyVehicleCompanyByCnpj(cnpj: string): Promise<any[]>{
    return await this.companyRepository.getFrequencyVehicleCompanyByCnpj(cnpj);
  }
}

export default CompanyService;
