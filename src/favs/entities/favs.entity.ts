import { ApiProperty } from '@nestjs/swagger';
import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Track } from '../../track/entities/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('favs')
export class Favorites {
  @PrimaryColumn()
  id?: number;

  @ApiProperty({
    type: Artist,
    isArray: true,
  })
  @ManyToMany(() => Artist)
  @JoinTable()
  artists: Artist[];

  @ApiProperty({
    type: Album,
    isArray: true,
  })
  @ManyToMany(() => Album)
  @JoinTable()
  albums: Album[];

  @ApiProperty({
    type: Track,
    isArray: true,
  })
  @ManyToMany(() => Track)
  @JoinTable()
  tracks: Track[];
}
