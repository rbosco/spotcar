import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateVehicleDTO {
  @ApiProperty()
  @IsString({ message: 'Brand field should be string' })
  @IsNotEmpty({ message: 'Brand is required' })
  brand: string;

  @ApiProperty()
  @IsString({ message: 'Model field should be string' })
  @IsNotEmpty({ message: 'Model is required' })
  model: string;

  @ApiProperty()
  @IsString({ message: 'Color field should be string' })
  @IsNotEmpty({ message: 'Color is required' })
  color: string;

  @ApiProperty()
  @IsString({ message: 'Board field should be string' })
  @IsNotEmpty({ message: 'Board is required' })
  board: string;

  @ApiProperty()
  @IsIn(['carro', 'moto'])
  type: string;
}

export default CreateVehicleDTO;
