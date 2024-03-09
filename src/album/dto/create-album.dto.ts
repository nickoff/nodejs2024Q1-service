import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  readonly name: string;
  @IsNumber()
  readonly year: number;
  @IsOptional()
  @IsString()
  @IsUUID()
  readonly artistId: string | null;
}
