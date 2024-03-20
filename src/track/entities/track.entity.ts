import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
