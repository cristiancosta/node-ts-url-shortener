// Types.
import {
  ShortenUrlInputDto,
  ShortenUrlOutputDto,
  UrlRepository,
  UrlService
} from '../types/url';

export const urlService = (urlRepository: UrlRepository): UrlService => {
  const shortenUrl = async (
    shortenUrlDto: ShortenUrlInputDto
  ): Promise<ShortenUrlOutputDto> => {
    const { longUrl: url } = shortenUrlDto;
    const dto = await urlRepository.getByLongUrl(url);
    if (dto) {
      return { shortUrl: dto.shortUrl };
    }
    return {
      shortUrl: url
    };
  };
  return {
    shortenUrl
  };
};
