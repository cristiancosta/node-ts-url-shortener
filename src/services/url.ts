// Configuration.
import { configuration } from '../configuration';

// Types.
import {
  ShortenUrlInputDto,
  ShortenUrlOutputDto,
  UrlDto,
  UrlRepository,
  UrlService
} from '../types/url';

// Utils.
import { decodeBase62, encodeBase62 } from '../utils/base62';

export const urlService = (urlRepository: UrlRepository): UrlService => {
  const { host, port } = configuration.server;

  const shortenUrl = async (
    shortenUrlDto: ShortenUrlInputDto
  ): Promise<ShortenUrlOutputDto> => {
    const { longUrl } = shortenUrlDto;
    let urlDto = await urlRepository.getUrlByLongUrl(longUrl);
    if (urlDto) {
      return { shortUrl: `${host}:${port}/${encodeBase62(urlDto.id)}` };
    }
    urlDto = await urlRepository.createUrl({ longUrl });
    return { shortUrl: `${host}:${port}/${encodeBase62(urlDto.id)}` };
  };

  const getUrlByEncodedId = async (encodedId: string): Promise<UrlDto> => {
    const urlDto = await urlRepository.getUrlById(decodeBase62(encodedId));
    if (!urlDto) {
      throw new Error();
    }
    return urlDto;
  };

  return {
    shortenUrl,
    getUrlByEncodedId
  };
};
