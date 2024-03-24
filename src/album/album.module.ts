import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { TrackModule } from '../track/track.module';
import { FavsModule } from '../favs/favs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Artist]), TrackModule, FavsModule],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
