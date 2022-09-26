import {IsDateString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ShowQueryDTO{
    @ApiProperty({description: 'Example: YYYY-MM-DD'})
    @IsDateString()
    readonly startDate: string;

    @ApiProperty({description: 'Example: YYYY-MM-DD'})
    readonly endDate : string
}

export default ShowQueryDTO;