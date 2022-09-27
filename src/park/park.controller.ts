import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from '../auth/jwt-authentication.guard';
import RequestWithUser from '../auth/requestWithUser.interface';
import CreateParkDTO from './dto/create-park.dto';
import { DeleteParkDTO } from './dto/delete-park.dto';
import { UpdateParkDTO } from './dto/update-park.dto';
import ParkService from './park.service';

@ApiTags('Park')
@Controller('park')
export class ParkController {
  constructor(private readonly parkService: ParkService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post('registerIn')
  @ApiBody({ type: CreateParkDTO })
  async registerIn(
    @Body() parkData: CreateParkDTO,
    @Req() request: RequestWithUser,
  ){
    return this.parkService.registerIn(parkData);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('registerOut')
  @ApiBody({type: UpdateParkDTO})
  async registerOut(@Body() updateParkDTO: UpdateParkDTO, @Req() request:RequestWithUser) {
    return this.parkService.registerOut(updateParkDTO);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete()
  @ApiBody({type: DeleteParkDTO})
  async delete(@Body() deleteParkDTO: DeleteParkDTO, @Req() request: RequestWithUser, @Res() response) {
    return this.parkService.delete(deleteParkDTO);
  }
}
