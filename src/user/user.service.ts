import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import CreateUserDto from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]>{
    const users = await this.usersRepository.find();
    return users;
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (user) {
      return user;
    }

    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async update(updateUserDTO:UpdateUserDTO): Promise<User>{
    await this.usersRepository.update({email : updateUserDTO.email}, updateUserDTO);
    const user = await this.usersRepository.findOneBy({email: updateUserDTO.email});
    if(!user){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async delete(email: string){
    const user = await this.usersRepository.softDelete({email: email});
    if(!user.affected){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return response.status(HttpStatus.OK).json({'message': 'User deleted with success!'})
  }
}
