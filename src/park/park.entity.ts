import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import Company from '../company/company.entity';
import Vehicle from '../vehicle/vehicle.entity';

@Entity()
class Park extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public vehicleId: number;

  @Column()
  public companyId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.park, { eager: true })
  public vehicle!: Vehicle;

  @ManyToOne(() => Company, (company) => company.park)
  public company!: Company;
}

export default Park;
