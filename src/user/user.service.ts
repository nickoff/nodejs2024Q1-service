/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { validate, v4 as uuid4 } from 'uuid';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UserService {
  private users = this.databaseService.getUsers();

  constructor(private readonly databaseService: DatabaseService) {}

  create(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      id: uuid4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(user);
    this.databaseService.updateUser(this.users);
    const { password: _, ...result } = user;
    return result;
  }

  findAll() {
    const usersWithoutPassword = this.users.map(
      ({ password: _, ...rest }) => rest,
    );
    return usersWithoutPassword;
  }

  findOne(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }
    const { password: _, ...result } = user;
    return result;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }
    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException(
        'Old password is not correct',
        HttpStatus.FORBIDDEN,
      );
    }
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index].password = updateUserDto.newPassword;
    this.users[index].updatedAt = Date.now();
    this.users[index].version += 1;
    this.databaseService.updateUser(this.users);
    const { password: _, ...result } = this.users[index];
    return result;
  }

  remove(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
    this.databaseService.updateUser(this.users);
    return { deleted: true };
  }
}
