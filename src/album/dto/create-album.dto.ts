import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  readonly name: string;
  @IsNumber()
  readonly year: number;
  @IsOptional()
  @IsString()
  readonly artistId: string | null;
}
