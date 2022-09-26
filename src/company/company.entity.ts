import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import Park from '../park/park.entity';

@Entity()
class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public name: string;

  @Column()
  public cnpj: string;

  @Column()
  public address: string;

  @Column()
  public phone: string;

  @Column()
  public qty_motorcycles: number;

  @Column()
  public qty_cars: number;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

  @OneToMany((type) => Park, (park) => park.company, {
    eager: true,
    cascade: ['remove'],
  })
  public park: Park[];
}

export default Company;
