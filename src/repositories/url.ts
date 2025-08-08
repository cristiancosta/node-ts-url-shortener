import { DataSource } from 'typeorm';

// Models.
import { Url } from '../models/url';

// Types.
import { CreateUrlDto, UrlDto, UrlRepository } from '../types/url';

export const urlRepository = (dataSource: DataSource): UrlRepository => {
  const repository = dataSource.getRepository(Url);

  const getUrlById = async (id: number): Promise<UrlDto | null> => {
    try {
      const urlEntity = await repository.findOne({ where: { id } });
      const result = urlEntity ? mapUrlEntityToUrlDto(urlEntity) : null;
      return result;
    } catch (error) {
      console.error('getUrlById#error', error);
      throw new Error('URL_RETRIEVAL_FAILURE');
    }
  };

  const getUrlByLongUrl = async (longUrl: string): Promise<UrlDto | null> => {
    try {
      const urlEntity = await repository.findOne({
        where: { long_url: longUrl }
      });
      const result = urlEntity ? mapUrlEntityToUrlDto(urlEntity) : null;
      return result;
    } catch (error) {
      console.error('getUrlByLongUrl#error', error);
      throw new Error('URL_RETRIEVAL_FAILURE');
    }
  };

  const createUrl = async (dto: CreateUrlDto): Promise<UrlDto> => {
    try {
      const { longUrl } = dto;
      const urlEntity = await repository.save({ long_url: longUrl });
      return mapUrlEntityToUrlDto(urlEntity);
    } catch (error) {
      console.error('getByLongUrl#error', error);
      throw new Error('URL_RETRIEVAL_FAILURE');
    }
  };

  const mapUrlEntityToUrlDto = (urlEntity: Url): UrlDto => {
    const urlDto: UrlDto = {
      id: urlEntity.id,
      longUrl: urlEntity.long_url,
      createdAt: urlEntity.created_at,
      updatedAt: urlEntity.created_at
    };
    return urlDto;
  };

  return {
    getUrlByLongUrl,
    createUrl,
    getUrlById
  };
};
