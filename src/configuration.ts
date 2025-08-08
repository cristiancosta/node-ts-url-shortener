import { config } from 'dotenv';

// Types.
import { AppConfiguration } from './types/configuration';

config();
export const configuration: AppConfiguration = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT ?? '3306', 10),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'nodeurlshortener'
  },
  server: {
    host: process.env.SERVER_HOST || 'localhost',
    port: parseInt(process.env.SERVER_PORT ?? '8080', 10)
  },
  swagger: {
    username: process.env.SWAGGER_USERNAME || 'admin',
    password: process.env.SWAGGER_PASSWORD || 'admin'
  }
};
