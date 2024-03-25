import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { validate, v4 as uuid4 } from 'uuid';
import { FavsService } from '../favs/favs.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
    private readonly favsService: FavsService,
  ) {}
  async create(createAlbumDto: CreateAlbumDto) {
    const album: Album = {
      id: uuid4(),
      ...createAlbumDto,
    };
    const newAlbum = this.albumsRepository.create(album);
    return await this.albumsRepository.save(newAlbum);
  }

  async findAll() {
    return await this.albumsRepository.find();
  }

  async findOne(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const album = await this.albumsRepository.findOne({
      where: {
        id,
      },
    });
    if (!album) {
      throw new HttpException('Not found album', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const album = await this.albumsRepository.findOne({
      where: {
        id,
      },
    });
    if (!album) {
      throw new HttpException('Not found album', HttpStatus.NOT_FOUND);
    }

    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;

    return await this.albumsRepository.save(album);
  }

  async remove(id: string) {
    if (validate(id) === false) {
      throw new HttpException('Id is not valid', HttpStatus.BAD_REQUEST);
    }
    const album = await this.albumsRepository.findOne({
      where: {
        id,
      },
    });

    if (!album) {
      throw new HttpException('Not found album', HttpStatus.NOT_FOUND);
    }

    const albumId = album.id;
    this.updateTracks(albumId);

    await this.albumsRepository.delete(id);
  }

  private async updateTracks(albumId: string) {
    const tracks = await this.tracksRepository.find({
      where: {
        albumId,
      },
    });

    if (!tracks) return;

    await Promise.all(
      tracks.map((track) => {
        track.albumId = null;
        return this.tracksRepository.save(track);
      }),
    );
  }
}
