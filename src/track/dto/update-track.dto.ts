import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly artistId: string | null;

  @IsOptional()
  @IsString()
  readonly albumId: string | null;

  @IsNumber()
  readonly duration: number;
}
