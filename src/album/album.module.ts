import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from '../favs/entities/favs.entity';
import { Track } from '../track/entities/track.entity';
import { Album } from './entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Track])],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
