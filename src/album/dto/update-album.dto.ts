import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  readonly name: string;
  @IsNumber()
  readonly year: number;
  @IsOptional()
  @IsString()
  @IsUUID()
  readonly artistId: string | null;
}
