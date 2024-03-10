import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Track } from '../track/entities/track.entity';
import { validate } from 'uuid';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { ArtistService } from '../artist/artist.service';
import { Favorites } from './entities/favs.entity';

@Injectable()
export class FavsService {
  private readonly tracks: Track[] = [];
  private readonly artists: Artist[] = [];
  private readonly albums: Album[] = [];

  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
  ) {}

  findAll(): Favorites {
    return { artists: this.artists, albums: this.albums, tracks: this.tracks };
  }

  addTrack(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const track = this.trackService.findAll().find((track) => track.id === id);
    if (!track) {
      throw new HttpException(
        'Not found track',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.tracks.push(track);
    return track;
  }

  addArtist(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artistService
      .findAll()
      .find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException(
        'Not found artist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.artists.push(artist);
    return artist;
  }

  addAlbum(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const album = this.albumService.findAll().find((album) => album.id === id);
    if (!album) {
      throw new HttpException(
        'Not found album',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.albums.push(album);
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
    return { deleted: true };
  }
}
