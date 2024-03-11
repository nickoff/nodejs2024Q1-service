import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  grammy: boolean;
}
