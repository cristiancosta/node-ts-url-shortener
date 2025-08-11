import { MySqlContainer } from '@testcontainers/mysql';
import { RedisContainer } from '@testcontainers/redis';

// App.
import { createApp } from '../../src/app';

// Cache.
import { createCache } from '../../src/cache';

// Configuration.
import { configuration } from '../../src/configuration';

// DataSource.
import { createDataSource } from '../../src/data-source';

// Types.
import { TestContext } from './types/setup';
import {
  CacheConfiguration,
  DataSourceConfiguration
} from '../../src/types/configuration';

const buildResources = async () => {
  const dbContainer = await new MySqlContainer('mysql').start();
  const dbConfig: DataSourceConfiguration = {
    database: dbContainer.getDatabase(),
    username: dbContainer.getUsername(),
    password: dbContainer.getUserPassword(),
    host: dbContainer.getHost(),
    port: dbContainer.getPort()
  };
  const dataSource = await createDataSource(dbConfig).initialize();

  const redisContainer = await new RedisContainer('redis').start();
  const cacheConfig: CacheConfiguration = {
    connectionUrl: redisContainer.getConnectionUrl(),
    url: {
      prefix: configuration.cache.url.prefix,
      ttlSeconds: configuration.cache.url.ttlSeconds
    }
  };
  const redis = await createCache(cacheConfig).connect();

  const context: TestContext = {
    app: createApp(dataSource, redis),
    database: {
      container: dbContainer,
      dataSource
    },
    cache: {
      container: redisContainer,
      redis
    }
  };
  return context;
};

const teardownResources = async (context: TestContext) => {
  if (context.database.dataSource.isInitialized) {
    await context.database.dataSource.destroy();
  }
  if (context.cache.redis.isOpen) {
    await context.cache.redis.disconnect();
  }
  await context.database.container.stop();
  await context.cache.container.stop();
};

export { buildResources, teardownResources };
