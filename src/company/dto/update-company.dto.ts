import { PartialType } from '@nestjs/swagger';
import { CreateCompanyDTO } from './create-company.dto';

export class UpdateCompanyDTO extends PartialType(CreateCompanyDTO) {}
