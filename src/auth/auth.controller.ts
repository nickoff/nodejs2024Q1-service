import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Create user',
  })
  @ApiResponse({
    status: 201,
    description: 'Request is valid.',
    type: User,
    schema: {
      $ref: getSchemaPath(User),
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request error. Request body does not contain required fields.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login user',
  })
  @ApiResponse({
    status: 200,
    description: 'Request is valid.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request error. Request body does not contain required fields.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden error. Invalid credentials.',
  })
  login(@Body() credentials: CreateUserDto) {
    return this.authService.login(credentials);
  }

  @Post('refresh')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Refresh user tokens',
  })
  @ApiResponse({
    status: 200,
    description: 'Request is valid.',
  })
  @ApiResponse({
    status: 401,
    description:
      'Bad Request error. Request body does not contain refresh token.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden error. Invalid refresh token.',
  })
  refresh(@Body() refreshToken: { refreshToken: string }) {
    return this.authService.refresh(refreshToken);
  }
}
