import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateParkDTO {
  @ApiProperty()
  @IsString({ message: 'Board should be string' })
  @IsNotEmpty({ message: 'Board is required' })
  board: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'ID company is required' })
  companyId: number;
}

export default CreateParkDTO;
