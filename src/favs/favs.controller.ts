import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Favorites } from './entities/favs.entity';
import { Track } from '../track/entities/track.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Favs')
@Controller('favs')
@UseGuards(AuthGuard)
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all favorites',
  })
  @ApiResponse({
    status: 200,
    description: 'Request is valid.',
    type: Favorites,
    schema: {
      $ref: getSchemaPath(Favorites),
    },
  })
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  @ApiOperation({
    summary: 'Add track to favorites',
  })
  @ApiResponse({
    status: 201,
    description: 'Request is valid.',
    type: Track,
    schema: {
      $ref: getSchemaPath(Track),
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request error. Request trackId is invalid (not uuid).',
  })
  @ApiResponse({
    status: 422,
    description:
      "Not Found error. Request trackId is not found (id === trackId doesn't exist).",
  })
  addTrack(@Param('id') id: string) {
    return this.favsService.addTrack(id);
  }

  @Post('artist/:id')
  @ApiOperation({
    summary: 'Add artist to favorites',
  })
  @ApiResponse({
    status: 201,
    description: 'Request is valid.',
    type: Artist,
    schema: {
      $ref: getSchemaPath(Artist),
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request error. Request artistId is invalid (not uuid).',
  })
  @ApiResponse({
    status: 422,
    description:
      "Not Found error. Request artistId is not found (id === artistId doesn't exist).",
  })
  addArtist(@Param('id') id: string) {
    return this.favsService.addArtist(id);
  }

  @Post('album/:id')
  @ApiOperation({
    summary: 'Add album to favorites',
  })
  @ApiResponse({
    status: 201,
    description: 'Request is valid.',
    type: Album,
    schema: {
      $ref: getSchemaPath(Album),
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request error. Request albumId is invalid (not uuid).',
  })
  @ApiResponse({
    status: 422,
    description:
      "Not Found error. Request albumId is not found (id === albumId doesn't exist).",
  })
  addAlbum(@Param('id') id: string) {
    return this.favsService.addAlbum(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete the track from favorites',
  })
  @ApiResponse({
    status: 204,
    description: 'Request is valid. Record is deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request error. Request trackId is invalid (not uuid).',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found error. Record track is not favorite.',
  })
  deleteTrack(@Param('id') id: string) {
    return this.favsService.deleteTrack(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete the artist from favorites',
  })
  @ApiResponse({
    status: 204,
    description: 'Request is valid. Record is deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request error. Request artistId is invalid (not uuid).',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found error. Record artist is not favorite.',
  })
  deleteArtist(@Param('id') id: string) {
    return this.favsService.deleteArtist(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete the album from favorites',
  })
  @ApiResponse({
    status: 204,
    description: 'Request is valid. Record is deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request error. Request albumId is invalid (not uuid).',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found error. Record album is not favorite.',
  })
  deleteAlbum(@Param('id') id: string) {
    return this.favsService.deleteAlbum(id);
  }
}
