import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsBoolean()
  readonly grammy: boolean;
}
