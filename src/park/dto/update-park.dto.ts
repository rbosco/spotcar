import { PartialType } from '@nestjs/swagger';
import CreateParkDTO from './create-park.dto';

export class UpdateParkDTO extends PartialType(CreateParkDTO) {}
