import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateCompanyDTO {
  @ApiProperty()
  @IsString({ message: 'Name should be string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty()
  @IsNumberString({ message: 'CNPJ should be string and numeric' })
  @IsNotEmpty({ message: 'CNPJ is required' })
  cnpj: string;

  @ApiProperty()
  @IsString({ message: 'Address should be string' })
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @ApiProperty()
  @IsNumberString({ message: 'Phone should be string and numeric' })
  @IsNotEmpty({ message: 'Phone is required' })
  phone: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'Quantity motorcycle is required' })
  qty_motorcycles: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'Quantity cars is required' })
  qty_cars: number;
}

export default CreateCompanyDTO;
