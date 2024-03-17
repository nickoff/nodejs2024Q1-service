import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @ApiProperty({
    type: String,
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  login: string;

  @Column()
  password: string;

  @ApiProperty()
  @Column()
  version: number;

  @ApiProperty()
  @Column('bigint')
  createdAt: number;

  @ApiProperty()
  @Column('bigint')
  updatedAt: number;

  getUser() {
    const { password: _, ...result } = this;
    return result;
  }
}
