import 'reflect-metadata';
import { DataSource } from 'typeorm';

// Models.
import { Url } from './models/url';

// Types.
import { DataSourceConfiguration } from './types/configuration';

export const createDataSource = (
  dbConfig: DataSourceConfiguration
): DataSource => {
  const { database, username, password, host, port } = dbConfig;
  const dataSource = new DataSource({
    type: 'mysql',
    host,
    port,
    username,
    password,
    database,
    entities: [Url],
    synchronize: true,
    logging: false
  });
  return dataSource;
};
