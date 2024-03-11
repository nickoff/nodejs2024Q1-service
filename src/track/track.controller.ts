import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Track } from './entities/track.entity';

@ApiTags('Tracks')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiOperation({
    summary: 'Create an track.',
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
    description:
      'Bad Request error. Request body does not contain required fields.',
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tracks records',
  })
  @ApiResponse({
    status: 200,
    description: 'Request is valid.',
    type: [Track],
    schema: {
      $ref: getSchemaPath(Track),
    },
  })
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get the track by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Request is valid.',
    type: Track,
    schema: {
      $ref: getSchemaPath(Track),
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request error. Request body does not contain required fields.',
  })
  @ApiResponse({
    status: 404,
    description: "Not Found error. Record with 'id === trackId' doesn't exist.",
  })
  findOne(@Param('id') id: string) {
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update the track',
  })
  @ApiResponse({
    status: 200,
    description: 'Request is valid.',
    type: Track,
    schema: {
      $ref: getSchemaPath(Track),
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request error. Request body does not contain required fields.',
  })
  @ApiResponse({
    status: 404,
    description: "Not Found error. Record with 'id === trackId' doesn't exist.",
  })
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete the track by id',
  })
  @ApiResponse({
    status: 204,
    description: 'Request is valid. Record is deleted.',
    type: Boolean,
    schema: {
      $ref: getSchemaPath('true'),
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request error. Request body does not contain required fields.',
  })
  @ApiResponse({
    status: 404,
    description: "Not Found error. Record with 'id === trackId' doesn't exist.",
  })
  remove(@Param('id') id: string) {
    return this.trackService.remove(id);
  }
}
