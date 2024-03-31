import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  async login(credentials: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: {
        login: credentials.login,
      },
    });

    if (!user) {
      throw new HttpException('Invalid login', HttpStatus.FORBIDDEN);
    }

    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isMatch) {
      throw new HttpException('Invalid password', HttpStatus.FORBIDDEN);
    }

    const payload = {
      userId: user.id,
      login: user.login,
    };

    const accessToken = await this.tokenService.getAccessToken(payload);
    const refreshToken = await this.tokenService.getRefreshToken(payload);
    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    return refreshToken;
  }
}
