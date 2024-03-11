import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty({
    type: String || null,
    format: 'uuid',
  })
  artistId: string | null;
  @ApiProperty({
    type: String || null,
    format: 'uuid',
  })
  albumId: string | null;
  @ApiProperty()
  duration: number;
}
