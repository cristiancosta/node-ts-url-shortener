import { DataSource } from 'typeorm';

// Errors.
import { InternalServerError } from '../errors/internal-server';

// Models.
import { Url } from '../models/url';

// Types.
import { CreateUrlDto, UrlDto, UrlRepository } from '../types/url';

export const urlRepository = (dataSource: DataSource): UrlRepository => {
  const repository = dataSource.getRepository(Url);

  const getById = async (id: number): Promise<UrlDto | null> => {
    try {
      const urlEntity = await repository.findOne({ where: { id } });
      const result = urlEntity ? mapUrlEntityToUrlDto(urlEntity) : null;
      return result;
    } catch (error) {
      console.error('getById#error', error);
      throw new InternalServerError('URL_RETRIEVAL_FAILURE');
    }
  };

  const getByUrl = async (url: string): Promise<UrlDto | null> => {
    try {
      const urlEntity = await repository.findOne({
        where: { url }
      });
      const result = urlEntity ? mapUrlEntityToUrlDto(urlEntity) : null;
      return result;
    } catch (error) {
      console.error('getByUrl#error', error);
      throw new InternalServerError('URL_RETRIEVAL_FAILURE');
    }
  };

  const createUrl = async (dto: CreateUrlDto): Promise<UrlDto> => {
    try {
      const { url } = dto;
      const urlEntity = await repository.save({ url });
      return mapUrlEntityToUrlDto(urlEntity);
    } catch (error) {
      console.error('createUrl#error', error);
      throw new InternalServerError('URL_CREATION_FAILURE');
    }
  };

  const mapUrlEntityToUrlDto = (urlEntity: Url): UrlDto => {
    const urlDto: UrlDto = {
      id: urlEntity.id,
      url: urlEntity.url,
      createdAt: urlEntity.created_at,
      updatedAt: urlEntity.created_at
    };
    return urlDto;
  };

  return {
    getByUrl,
    createUrl,
    getById
  };
};
