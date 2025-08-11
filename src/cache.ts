import { createClient, RedisClientType } from 'redis';

// Configuration.
import { CacheConfiguration } from './types/configuration';

export const createCache = (cacheConfig: CacheConfiguration) => {
  const client: RedisClientType = createClient({
    url: cacheConfig.connectionUrl
  });

  client.on('error', (error) => console.error('Redis Client error', error));

  return client;
};
