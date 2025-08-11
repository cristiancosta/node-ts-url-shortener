// Configuration.
import { configuration } from '../configuration';

// Errors.
import { NotFoundError } from '../errors/not-found';

// Types.
import {
  ShortenUrlInputDto,
  ShortenUrlOutputDto,
  UrlCache,
  UrlRepository,
  UrlService
} from '../types/url';

// Utils.
import { decodeBase62, encodeBase62 } from '../utils/base62';

export const urlService = (
  urlRepository: UrlRepository,
  urlCache: UrlCache
): UrlService => {
  const { host, port } = configuration.server;

  const shortenUrl = async (
    dto: ShortenUrlInputDto
  ): Promise<ShortenUrlOutputDto> => {
    const { url } = dto;
    let urlDto = await urlRepository.getByUrl(url);
    if (urlDto) {
      return { shortUrl: `${host}:${port}/${encodeBase62(urlDto.id)}` };
    }
    urlDto = await urlRepository.createUrl({ url });
    return { shortUrl: `${host}:${port}/${encodeBase62(urlDto.id)}` };
  };

  const getUrlByEncodedId = async (encodedId: string): Promise<string> => {
    const url = await urlCache.getUrlByEncodedId(encodedId);
    if (url) {
      return url;
    }

    const urlDto = await urlRepository.getById(decodeBase62(encodedId));
    if (!urlDto) {
      throw new NotFoundError('URL_NOT_FOUND');
    }

    await urlCache.setUrlToEncodedId(encodedId, urlDto.url);
    return urlDto.url;
  };

  return {
    shortenUrl,
    getUrlByEncodedId
  };
};
