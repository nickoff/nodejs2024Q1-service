import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { validate, v4 as uuid4 } from 'uuid';

@Injectable()
export class ArtistService {
  private readonly artists: Artist[] = [];
  create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: uuid4(),
      ...createArtistDto,
    };
    this.artists.push(artist);
    return artist;
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }
    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists[index] = {
      ...artist,
      ...updateArtistDto,
    };
    return this.artists[index];
  }

  remove(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }
    const index = this.artists.findIndex((user) => user.id === id);
    this.artists.splice(index, 1);
    return { deleted: true };
  }
}
