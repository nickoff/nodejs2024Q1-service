import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { validate, v4 as uuid4 } from 'uuid';
import { TrackService } from '../track/track.service';
import { DatabaseService } from '../database/database.service';
import { FavsService } from '../favs/favs.service';

@Injectable()
export class AlbumService {
  private readonly albums = this.databaseService.getAlbums();
  constructor(
    private readonly trackService: TrackService,
    private readonly databaseService: DatabaseService,
    private readonly favsService: FavsService,
  ) {}
  create(createAlbumDto: CreateAlbumDto) {
    const album: Album = {
      id: uuid4(),
      ...createAlbumDto,
    };
    this.albums.push(album);
    this.databaseService.updateAlbums(this.albums);
    return album;
  }

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException('Not found album', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException('Not found album', HttpStatus.NOT_FOUND);
    }
    const index = this.albums.findIndex((album) => album.id === id);
    this.albums[index] = {
      ...album,
      ...updateAlbumDto,
    };
    this.databaseService.updateAlbums(this.albums);
    return this.albums[index];
  }

  remove(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException('Not found album', HttpStatus.NOT_FOUND);
    }
    const albumId = album.id;
    this.updateTracks(albumId);
    const index = this.albums.findIndex((album) => album.id === id);
    this.albums.splice(index, 1);
    this.databaseService.updateAlbums(this.albums);
    const favoritesAlbum = this.favsService
      .findAll()
      .albums.find((album) => album.id === id);
    if (favoritesAlbum) {
      this.favsService.deleteAlbum(id);
    }
    return { deleted: true };
  }

  private updateTracks(albumId: string) {
    const trackIds = this.trackService
      .findAll()
      .filter((track) => track.albumId === albumId)
      .map((track) => track.id);
    trackIds.forEach((trackId) => {
      const track = this.trackService.findOne(trackId);
      this.trackService.update(trackId, {
        ...track,
        albumId: null,
      });
    });
  }
}
