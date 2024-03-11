import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavsService } from './favs.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Favs')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  addTrack(@Param('id') id: string) {
    return this.favsService.addTrack(id);
  }

  @Post('artist/:id')
  addArtist(@Param('id') id: string) {
    return this.favsService.addArtist(id);
  }

  @Post('album/:id')
  addAlbum(@Param('id') id: string) {
    return this.favsService.addAlbum(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    return this.favsService.deleteTrack(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    return this.favsService.deleteArtist(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    return this.favsService.deleteAlbum(id);
  }
}
