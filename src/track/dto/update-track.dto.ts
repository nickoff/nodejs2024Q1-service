import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  readonly artistId: string | null;

  @IsOptional()
  @IsString()
  @IsUUID()
  readonly albumId: string | null;

  @IsNumber()
  readonly duration: number;
}
