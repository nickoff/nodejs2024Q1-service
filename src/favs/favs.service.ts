import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { validate } from 'uuid';
import { Favorites } from './entities/favs.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from '../track/entities/track.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';

@Injectable()
export class FavsService implements OnModuleInit {
  constructor(
    @InjectRepository(Favorites)
    private favsRepository: Repository<Favorites>,
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  async onModuleInit() {
    const favorites = await this.favsRepository.findOne({
      where: {
        id: 1,
      },
    });

    if (!favorites) {
      await this.favsRepository.save({
        id: 1,
        artists: [],
        albums: [],
        tracks: [],
      });
    }
  }

  async findAll() {
    const favorites = await this.favsRepository.findOne({
      where: {
        id: 1,
      },
      relations: ['albums', 'artists', 'tracks'],
    });

    return {
      albums: favorites.albums,
      artists: favorites.artists,
      tracks: favorites.tracks,
    };
  }

  async addTrack(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const track = await this.tracksRepository.findOne({
      where: {
        id,
      },
    });
    if (!track) {
      throw new HttpException(
        'Not found track',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favorites = await this.findAll();
    favorites.tracks.push(track);
    await this.favoritesUpdated(favorites);

    return track;
  }

  async addArtist(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.artistsRepository.findOne({
      where: {
        id,
      },
    });
    if (!artist) {
      throw new HttpException(
        'Not found artist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favorites = await this.findAll();
    favorites.artists.push(artist);
    await this.favoritesUpdated(favorites);
    return artist;
  }

  async addAlbum(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const album = await this.albumsRepository.findOne({
      where: {
        id,
      },
    });
    if (!album) {
      throw new HttpException(
        'Not found album',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favorites = await this.findAll();
    favorites.albums.push(album);
    await this.favoritesUpdated(favorites);
    return album;
  }

  async deleteTrack(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const favorites = await this.findAll();
    const track = favorites.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Not found track', HttpStatus.NOT_FOUND);
    }
    const index = favorites.tracks.findIndex((track) => track.id === id);
    favorites.tracks.splice(index, 1);
    await this.favoritesUpdated(favorites);
  }

  async deleteArtist(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const favorites = await this.findAll();
    const artist = favorites.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Not found artist', HttpStatus.NOT_FOUND);
    }
    const index = favorites.artists.findIndex((artist) => artist.id === id);
    favorites.artists.splice(index, 1);
    await this.favoritesUpdated(favorites);
  }

  async deleteAlbum(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const favorites = await this.findAll();
    const album = favorites.albums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException('Not found album', HttpStatus.NOT_FOUND);
    }
    const index = favorites.albums.findIndex((album) => album.id === id);
    favorites.albums.splice(index, 1);
    await this.favoritesUpdated(favorites);
  }

  private async favoritesUpdated(favorites: Favorites) {
    const favoritesUpdated = {
      id: 1,
      artists: favorites.artists,
      albums: favorites.albums,
      tracks: favorites.tracks,
    };
    await this.favsRepository.save(favoritesUpdated);
  }
}
