import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { FavsModule } from '../favs/favs.module';
import { Track } from '../track/entities/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Album, Track]), FavsModule],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
