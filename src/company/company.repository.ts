import {EntityRepository, DataSource, Repository} from 'typeorm';
import Company from './company.entity';
import { ShowQueryDTO } from './dto/show-query.dto';

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company>{
  constructor(
    private dataSource: DataSource
  ) {
    super(Company, dataSource.createEntityManager())
  }

  async getCountInOutPark(): Promise<any[]>{
    const countInOut = await this.createQueryBuilder("c")
      .select("c.cnpj, COUNT(p.created_at) as 'in', COUNT(p.updated_at) as 'out'")
      .leftJoin("c.park", "p")
      .groupBy('c.cnpj')
      .getRawMany()

    return countInOut;
  }

  async getCountInOutParkByCnpj(cnpj : string): Promise<void>{
    const countInOut = await this.createQueryBuilder("c")
      .select("COUNT(p.created_at) as 'in', COUNT(p.updated_at) as 'out'")
      .innerJoin("c.park", "p")
      .where("c.cnpj = :cnpj",{cnpj: cnpj})
      .getRawOne()

    return countInOut;
  }

  async getCountInParkPerHour(): Promise<any[]>{
    const countInPerHour = await this.createQueryBuilder("c")
      .select("c.cnpj as cnpj")
      .distinct(true)
      .addSelect("HOUR(p.created_at) as hora")
      .addSelect("(SELECT COUNT(pl.created_at) FROM park as pl WHERE c.id = pl.companyId AND TIME_FORMAT(pl.created_at,'%H %s') = hora) as qty_in")
      .leftJoin("c.park","p")
      .where("p.created_at IS NOT NULL")
      .getRawMany()
    console.log(countInPerHour);
    return countInPerHour;
  }

  async getCountOutParkPerHour(): Promise<any[]>{
    const countOutPerHour = await this.createQueryBuilder("c")
      .select("c.cnpj as cnpj")
      .distinct(true)
      .addSelect("HOUR(p.updated_at) as hora")
      .addSelect("(SELECT COUNT(pl.updated_at) FROM park as pl WHERE c.id = pl.companyId AND TIME_FORMAT(pl.updated_at,'%H %s') = hora) as qty_out")
      .leftJoin("c.park","p")
      .where("p.updated_at IS NOT NULL")
      .getRawMany()
    console.log(countOutPerHour);
    return countOutPerHour;
  }

  async getCountVehicleParkInPerPeriodByCnpj(cnpj: string,showQueryDTO:ShowQueryDTO): Promise<any>{
    const countInPerPeriod = await this.createQueryBuilder("c")
      .select("c.cnpj as cnpj")
      .distinct(true)
      .addSelect("(SELECT COUNT(pl.created_at) FROM park pl WHERE c.id = pl.companyId) AS qty_in")
      .innerJoin("c.park","p")
      .where("DATE_FORMAT(p.created_at, '%Y-%m-%d') BETWEEN :dateInitial AND :dateFinal",{dateInitial: showQueryDTO.startDate, dateFinal: showQueryDTO.endDate})
      .andWhere("c.cnpj=:cnpj",{cnpj: cnpj})
      .getRawOne()
    return countInPerPeriod;
  }

  async getFrequencyVehicleCompanyByCnpj(cnpj): Promise<any[]>{
    const frequencyVehicle = await this.createQueryBuilder("c")
      .select("c.cnpj as cnpj")
      .distinct(true)
      .addSelect("v.board as board")
      .addSelect("(SELECT COUNT(pl.vehicleId) FROM park pl WHERE pl.vehicleId = v.id) AS frequency")
      .innerJoin("c.park","p")
      .innerJoin("p.vehicle","v")
      .where("c.cnpj=:cnpj",{cnpj: cnpj})
      .orderBy("frequency", "DESC")
      .getRawMany()
  return frequencyVehicle;
  }
}