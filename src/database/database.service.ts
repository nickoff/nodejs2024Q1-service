import { Injectable } from '@nestjs/common';
import { Artist } from '../artist/entities/artist.entity';
import { User } from '../user/entities/user.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';
import { Favorites } from 'src/favs/entities/favs.entity';

@Injectable()
export class DatabaseService {
  private artists: Artist[] = [];
  private albums: Album[] = [];
  private tracks: Track[] = [];
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getArtists() {
    return this.artists;
  }

  getAlbums() {
    return this.albums;
  }

  getTracks() {
    return this.tracks;
  }

  getFavorites() {
    return this.favorites;
  }

  updateArtists(artists: Artist[]) {
    this.artists = [...artists];
  }

  updateAlbums(albums: Album[]) {
    this.albums = [...albums];
  }

  updateTracks(tracks: Track[]) {
    this.tracks = [...tracks];
  }

  updateFavorites(artists?: Artist[], albums?: Album[], tracks?: Track[]) {
    this.favorites = { ...this.favorites, artists, albums, tracks };
  }
}
