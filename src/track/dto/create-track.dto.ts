import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
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
