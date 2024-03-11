import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsUUID()
  readonly artistId: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsUUID()
  readonly albumId: string | null;

  @ApiProperty()
  @IsNumber()
  readonly duration: number;
}
