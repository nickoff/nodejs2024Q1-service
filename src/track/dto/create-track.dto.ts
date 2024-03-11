import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    type: String || null,
    format: 'uuid',
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  readonly artistId: string | null;

  @ApiProperty({
    type: String || null,
    format: 'uuid',
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  readonly albumId: string | null;

  @ApiProperty()
  @IsNumber()
  readonly duration: number;
}
