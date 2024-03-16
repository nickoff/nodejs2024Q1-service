import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validate, v4 as uuid4 } from 'uuid';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { DatabaseService } from '../database/database.service';
import { FavsService } from '../favs/favs.service';

@Injectable()
export class ArtistService {
  private readonly artists = this.databaseService.getArtists();
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly databaseService: DatabaseService,
    private readonly favsService: FavsService,
  ) {}
  create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: uuid4(),
      ...createArtistDto,
    };
    this.artists.push(artist);
    this.databaseService.updateArtists(this.artists);
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
      throw new HttpException('Not found artist', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Not found artist', HttpStatus.NOT_FOUND);
    }
    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists[index] = {
      ...artist,
      ...updateArtistDto,
    };
    this.databaseService.updateArtists(this.artists);
    return this.artists[index];
  }

  remove(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Not found artist', HttpStatus.NOT_FOUND);
    }
    const artistId = artist.id;
    this.updateAlbums(artistId);
    this.updateTracks(artistId);
    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists.splice(index, 1);
    this.databaseService.updateArtists(this.artists);
    const favoritesArtist = this.favsService
      .findAll()
      .artists.find((artist) => artist.id === id);
    if (favoritesArtist) {
      this.favsService.deleteArtist(id);
    }
    return { deleted: true };
  }

  private updateAlbums(artistId: string) {
    const albumIds = this.albumService
      .findAll()
      .filter((album) => album.artistId === artistId)
      .map((album) => album.id);
    albumIds.forEach((albumId) => {
      const album = this.albumService.findOne(albumId);
      this.albumService.update(albumId, {
        ...album,
        artistId: null,
      });
    });
  }

  private updateTracks(artistId: string) {
    const trackIds = this.trackService
      .findAll()
      .filter((track) => track.artistId === artistId)
      .map((track) => track.id);
    trackIds.forEach((trackId) => {
      const track = this.trackService.findOne(trackId);
      this.trackService.update(trackId, {
        ...track,
        artistId: null,
      });
    });
  }
}
