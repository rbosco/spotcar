import {EntityRepository, DataSource, Repository} from 'typeorm';
import Park from './park.entity';

@EntityRepository(Park)
export class ParkRepository extends Repository<Park>{
    constructor(
        private dataSource: DataSource
    ){
        super(Park, dataSource.createEntityManager())
    }

    async getVehicleInPark(id: number): Promise<Park>{
        const vehicleInPark = await this.createQueryBuilder("v")
            .where('v.vehicleId = :id AND v.updated_at IS NULL',{id : id})
            .getRawOne();
    
        return vehicleInPark;
    }
}