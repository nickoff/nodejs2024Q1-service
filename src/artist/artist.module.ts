import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { DatabaseModule } from '../database/database.module';
import { FavsModule } from '../favs/favs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Artist]),
    AlbumModule,
    TrackModule,
    FavsModule,
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
