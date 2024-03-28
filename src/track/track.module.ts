import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track, Album, Artist])],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
