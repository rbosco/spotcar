import Park from '../park/park.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Vehicle extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public brand: string;

  @Column()
  public model: string;

  @Column()
  public color: string;

  @Column({ unique: true })
  public board: string;

  @Column()
  public type: string;

  @OneToMany((type) => Park, (park) => park.vehicle, { cascade: ['remove'] })
  public park: Park[];
}

export default Vehicle;
