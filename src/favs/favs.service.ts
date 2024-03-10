import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'uuid';
import { Favorites } from './entities/favs.entity';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class FavsService {
  private readonly tracks = this.databaseService.getFavorites().tracks;
  private readonly artists = this.databaseService.getFavorites().artists;
  private readonly albums = this.databaseService.getFavorites().albums;

  constructor(private readonly databaseService: DatabaseService) {}

  findAll(): Favorites {
    return { artists: this.artists, albums: this.albums, tracks: this.tracks };
  }

  addTrack(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const track = this.databaseService
      .getTracks()
      .find((track) => track.id === id);
    if (!track) {
      throw new HttpException(
        'Not found track',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.tracks.push(track);
    this.databaseService.updateFavorites(
      this.artists,
      this.albums,
      this.tracks,
    );
    return track;
  }

  addArtist(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.databaseService
      .getArtists()
      .find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException(
        'Not found artist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.artists.push(artist);
    this.databaseService.updateFavorites(
      this.artists,
      this.albums,
      this.tracks,
    );
    return artist;
  }

  addAlbum(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const album = this.databaseService
      .getAlbums()
      .find((album) => album.id === id);
    if (!album) {
      throw new HttpException(
        'Not found album',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.albums.push(album);
    this.databaseService.updateFavorites(
      this.artists,
      this.albums,
      this.tracks,
    );
    return album;
  }

  deleteTrack(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Not found track', HttpStatus.NOT_FOUND);
    }
    const index = this.tracks.findIndex((track) => track.id === id);
    this.tracks.splice(index, 1);
    this.databaseService.updateFavorites(
      this.artists,
      this.albums,
      this.tracks,
    );
    return { deleted: true };
  }

  deleteArtist(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Not found artist', HttpStatus.NOT_FOUND);
    }
    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists.splice(index, 1);
    this.databaseService.updateFavorites(
      this.artists,
      this.albums,
      this.tracks,
    );
    return { deleted: true };
  }

  deleteAlbum(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException('Not found album', HttpStatus.NOT_FOUND);
    }
    const index = this.albums.findIndex((album) => album.id === id);
    this.albums.splice(index, 1);
    this.databaseService.updateFavorites(
      this.artists,
      this.albums,
      this.tracks,
    );
    return { deleted: true };
  }
}
