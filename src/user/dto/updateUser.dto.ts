import { PartialType } from "@nestjs/swagger";
import CreateUserDto from "./createUser.dto";

export class UpdateUserDTO extends PartialType(CreateUserDto){}