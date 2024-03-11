import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNumber()
  readonly year: number;

  @ApiProperty({
    type: String || null,
    format: 'uuid',
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  readonly artistId: string | null;
}
