import { IsEmail, IsNotEmpty, isNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogInDto {
  @ApiProperty()
  @IsEmail({ message: 'Email should be valid' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'Email should be string' })
  @IsNotEmpty({ message: 'Email is required' })
  password: string;
}

export default LogInDto;
