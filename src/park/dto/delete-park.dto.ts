import { PartialType } from '@nestjs/swagger';
import CreateParkDTO from './create-park.dto';

export class DeleteParkDTO extends PartialType(CreateParkDTO) {}
