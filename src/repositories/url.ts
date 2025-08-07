import { DataSource } from 'typeorm';

// Models.
import { Url } from '../models/url';

// Types.
import { UrlDto, UrlRepository } from '../types/url';

export const urlRepository = (dataSource: DataSource): UrlRepository => {
  const repository = dataSource.getRepository(Url);

  const getByLongUrl = async (longUrl: string): Promise<UrlDto | null> => {
    try {
      const urlEntity = await repository.findOne({
        where: { long_url: longUrl }
      });
      const result = urlEntity ? mapUrlEntityToUrlDto(urlEntity) : null;
      return result;
    } catch (error) {
      console.error('getByLongUrl#error', error);
      throw new Error('URL_RETRIEVAL_FAILURE');
    }
  };

  const mapUrlEntityToUrlDto = (urlEntity: Url): UrlDto => {
    const urlDto: UrlDto = {
      id: urlEntity.id,
      shortUrl: urlEntity.short_url,
      longUrl: urlEntity.long_url,
      createdAt: urlEntity.created_at,
      updatedAt: urlEntity.created_at
    };
    return urlDto;
  };

  return {
    getByLongUrl
  };
};
