import { RedisClientType } from 'redis';

// Configuration.
import { configuration } from '../configuration';

// Types.
import { UrlCache } from '../types/url';

export const urlCache = (cache: RedisClientType): UrlCache => {
  const { prefix, ttlSeconds } = configuration.cache.url;

  const getUrlByEncodedId = async (
    encodedId: string
  ): Promise<string | null> => {
    try {
      const data = await cache.get(`${prefix}:${encodedId}`);
      return data;
    } catch (error) {
      console.error('getUrlByEncodedId#error', error);
      return null;
    }
  };

  const setUrlToEncodedId = async (
    encodedId: string,
    url: string
  ): Promise<void> => {
    try {
      await cache.setEx(`${prefix}:${encodedId}`, ttlSeconds, url);
    } catch (error) {
      console.error('setUrlToEncodedId#error', error);
    }
  };

  return {
    getUrlByEncodedId,
    setUrlToEncodedId
  };
};
