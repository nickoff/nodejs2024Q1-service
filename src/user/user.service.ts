import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate, v4 as uuid4 } from 'uuid';
import { User } from './entities/user.entity';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';

dotenv.config();
const salt = Number(process.env.CRYPT_SALT) || 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, salt);
    const user = {
      login: createUserDto.login,
      password: hash,
      id: uuid4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const createdUser = this.usersRepository.create(user);
    return (await this.usersRepository.save(createdUser)).getUser();
  }

  async findAll() {
    const users = await this.usersRepository.find();

    return users.map((user) => user.getUser());
  }

  async findOne(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }

    return user.getUser();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(
      updateUserDto.oldPassword,
      user.password,
    );

    if (!isMatch) {
      throw new HttpException(
        'Old password is not correct',
        HttpStatus.FORBIDDEN,
      );
    }

    const newHash = await bcrypt.hash(updateUserDto.newPassword, salt);

    user.password = newHash;
    user.updatedAt = Date.now();
    user.version += 1;

    return (await this.usersRepository.save(user)).getUser();
  }

  async remove(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }
    await this.usersRepository.delete(id);
  }
}
