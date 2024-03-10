import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from '../track/track.module';
import { DatabaseModule } from '../database/database.module';
import { FavsModule } from '../favs/favs.module';

@Module({
  imports: [TrackModule, DatabaseModule, FavsModule],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
