import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validate, v4 as uuid4 } from 'uuid';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { DatabaseService } from '../database/database.service';
import { FavsService } from '../favs/favs.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly databaseService: DatabaseService,
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
    const favoritesArtist = this.favsService
      .findAll()
      .artists.find((artist) => artist.id === id);
    if (favoritesArtist) {
      this.favsService.deleteArtist(id);
    }
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
