import * as dotenv from 'dotenv';
import { User } from '../user/entities/user.entity';
import { DataSourceOptions } from 'typeorm';
import { Artist } from '../artist/entities/artist.entity';

dotenv.config();

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [User, Artist],
  synchronize: false,
};
