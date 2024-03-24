import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';

@Entity('tracks')
export class Track {
  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({
    type: String || null,
    format: 'uuid',
  })
  @Column({ nullable: true, type: 'uuid' })
  artistId: string | null;

  @ApiProperty({
    type: String || null,
    format: 'uuid',
  })
  @Column({ nullable: true, type: 'uuid' })
  albumId: string | null;

  @ApiProperty()
  @Column()
  duration: number;

  @ManyToOne(() => Artist, (artist) => artist.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artist?: Artist;

  @ManyToOne(() => Album, (album) => album.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'albumId' })
  album?: Album;
}
