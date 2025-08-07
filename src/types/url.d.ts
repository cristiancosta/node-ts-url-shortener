import { Request, Response } from 'express';

export type UrlRepository = {
  getByLongUrl: (longUrl: string) => Promise<UrlDto | null>;
};

export type UrlService = {
  shortenUrl: (
    shortenUrlDto: ShortenUrlInputDto
  ) => Promise<ShortenUrlOutputDto>;
};

export type UrlController = {
  shortenUrl: (req: Request, res: Response) => Promise<void>;
};

export type UrlDto = {
  id: number;
  shortUrl: string;
  longUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ShortenUrlInputDto = {
  longUrl: string;
};

export type ShortenUrlOutputDto = {
  shortUrl: string;
};
