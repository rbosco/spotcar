import {
    Body,
    Controller,
    Delete,
    HttpStatus,
    Get,
    Post,
    Put,
    Req,
    Res,
    UseGuards,
    HttpCode,
    Param,
  } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { response } from 'express';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Get()
    async getAll(){
        return this.userService.getAll();
    }

    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Get(':email')
    async showByEmail(@Param('email') email: string){
        return this.userService.getByEmail(email);
    }
    
    @UseGuards(JwtAuthenticationGuard)
    @Put()
    @ApiBody({type: UpdateUserDTO})
    async update(@Body() updateUserDTO: UpdateUserDTO, @Req() request:RequestWithUser){
        return this.userService.update(updateUserDTO);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Delete(':email')
    async delete(@Param('email') email: string, @Res() response){
        await this.userService.delete(email);
        return response.status(HttpStatus.OK).json({'message': 'User deleted with success!'})
    }
}