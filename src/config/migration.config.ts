import { DataSource, DataSourceOptions } from 'typeorm';
import { ormConfig } from './ormconfig';

const migrationDataSourceConfig: DataSourceOptions = {
  ...ormConfig,
  migrations: ['migrations/*.ts'],
};

export default new DataSource(migrationDataSourceConfig);
