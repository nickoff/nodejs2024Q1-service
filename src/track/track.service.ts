import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { validate, v4 as uuid4 } from 'uuid';
import { DatabaseService } from '../database/database.service';
import { FavsService } from '../favs/favs.service';

@Injectable()
export class TrackService {
  private readonly tracks = this.databaseService.getTracks();
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly favsService: FavsService,
  ) {}
  create(createTrackDto: CreateTrackDto) {
    const track: Track = {
      id: uuid4(),
      ...createTrackDto,
    };

    this.tracks.push(track);
    this.databaseService.updateTracks(this.tracks);
    return track;
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Not found track', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Not found track', HttpStatus.NOT_FOUND);
    }
    const index = this.tracks.findIndex((track) => track.id === id);
    this.tracks[index] = {
      ...track,
      ...updateTrackDto,
    };
    this.databaseService.updateTracks(this.tracks);
    return this.tracks[index];
  }

  remove(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Not found track', HttpStatus.NOT_FOUND);
    }
    const index = this.tracks.findIndex((track) => track.id === id);
    this.tracks.splice(index, 1);
    this.databaseService.updateTracks(this.tracks);
    const favoritesTrack = this.favsService
      .findAll()
      .tracks.find((track) => track.id === id);
    if (favoritesTrack) {
      this.favsService.deleteTrack(id);
    }
    return { deleted: true };
  }
}
