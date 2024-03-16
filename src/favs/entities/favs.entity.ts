import { ApiProperty } from '@nestjs/swagger';
import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Track } from '../../track/entities/track.entity';

export class Favorites {
  @ApiProperty({
    type: Artist,
    isArray: true,
  })
  artists: Artist[];

  @ApiProperty({
    type: Album,
    isArray: true,
  })
  albums: Album[];

  @ApiProperty({
    type: Track,
    isArray: true,
  })
  tracks: Track[];
}
