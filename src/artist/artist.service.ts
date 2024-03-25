import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validate, v4 as uuid4 } from 'uuid';
import { FavsService } from '../favs/favs.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
    private readonly favsService: FavsService,
  ) {}
  async create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: uuid4(),
      ...createArtistDto,
    };

    const newArtist = this.artistsRepository.create(artist);
    return await this.artistsRepository.save(newArtist);
  }

  async findAll() {
    return await this.artistsRepository.find();
  }

  async findOne(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.artistsRepository.findOne({
      where: {
        id,
      },
    });

    if (!artist) {
      throw new HttpException('Not found artist', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.artistsRepository.findOne({
      where: {
        id,
      },
    });

    if (!artist) {
      throw new HttpException('Not found artist', HttpStatus.NOT_FOUND);
    }

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;

    return await this.artistsRepository.save(artist);
  }

  async remove(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.artistsRepository.findOne({
      where: {
        id,
      },
    });

    if (!artist) {
      throw new HttpException('Not found artist', HttpStatus.NOT_FOUND);
    }

    await this.artistsRepository.delete(id);
    const artistId = artist.id;
    this.updateAlbums(artistId);
    this.updateTracks(artistId);
  }

  private async updateAlbums(artistId: string) {
    const albums = await this.albumsRepository.find({
      where: {
        artistId,
      },
    });

    if (!albums) return;

    await Promise.all(
      albums.map((album) => {
        album.artistId = null;
        return this.albumsRepository.save(album);
      }),
    );
  }

  private async updateTracks(artistId: string) {
    const tracks = await this.tracksRepository.find({
      where: {
        artistId,
      },
    });

    if (!tracks) return;

    await Promise.all(
      tracks.map((track) => {
        track.artistId = null;
        return this.tracksRepository.save(track);
      }),
    );
  }
}
