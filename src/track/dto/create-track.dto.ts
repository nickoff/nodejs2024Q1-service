import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
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
