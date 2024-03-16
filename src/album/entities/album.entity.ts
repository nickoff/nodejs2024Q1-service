import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  year: number;
  @ApiProperty({
    type: String || null,
    format: 'uuid',
  })
  artistId: string | null;
}
