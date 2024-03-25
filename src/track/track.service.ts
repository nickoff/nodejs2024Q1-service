import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { validate, v4 as uuid4 } from 'uuid';
import { FavsService } from '../favs/favs.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}
  async create(createTrackDto: CreateTrackDto) {
    const track: Track = {
      id: uuid4(),
      ...createTrackDto,
    };

    const newTrack = this.tracksRepository.create(track);
    return await this.tracksRepository.save(newTrack);
  }

  async findAll() {
    return await this.tracksRepository.find();
  }

  async findOne(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const track = await this.tracksRepository.findOne({
      where: {
        id,
      },
    });

    if (!track) {
      throw new HttpException('Not found track', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const track = await this.tracksRepository.findOne({
      where: {
        id,
      },
    });
    if (!track) {
      throw new HttpException('Not found track', HttpStatus.NOT_FOUND);
    }

    track.albumId = updateTrackDto.albumId;
    track.artistId = updateTrackDto.artistId;
    track.duration = updateTrackDto.duration;
    track.name = updateTrackDto.name;

    return await this.tracksRepository.save(track);
  }

  async remove(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const track = await this.tracksRepository.findOne({
      where: {
        id,
      },
    });
    if (!track) {
      throw new HttpException('Not found track', HttpStatus.NOT_FOUND);
    }
    await this.tracksRepository.delete(id);
  }
}
