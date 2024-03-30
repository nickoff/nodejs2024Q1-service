import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  async login(credentials: CreateUserDto) {
    return credentials;
  }

  async refresh(refreshToken: string) {
    return refreshToken;
  }
}
