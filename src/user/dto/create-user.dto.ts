import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  readonly login: string;

  @ApiProperty()
  @IsString()
  readonly password: string;
}
