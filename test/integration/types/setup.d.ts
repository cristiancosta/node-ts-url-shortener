import { Express } from 'express';
import { DataSource } from 'typeorm';
import { RedisClientType } from 'redis';
import { StartedMySqlContainer } from '@testcontainers/mysql';
import { StartedRedisContainer } from '@testcontainers/redis';

export type TestContext = {
  app: Express;
  database: {
    container: StartedMySqlContainer;
    dataSource: DataSource;
  };
  cache: {
    container: StartedRedisContainer;
    redis: RedisClientType;
  };
};
