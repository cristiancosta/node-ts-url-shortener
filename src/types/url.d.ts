import { Request, Response } from 'express';

export type UrlRepository = {
  getUrlById: (id: number) => Promise<UrlDto | null>;
  getUrlByLongUrl: (longUrl: string) => Promise<UrlDto | null>;
  createUrl: (dto: CreateUrlDto) => Promise<UrlDto>;
};

export type UrlService = {
  shortenUrl: (
    shortenUrlDto: ShortenUrlInputDto
  ) => Promise<ShortenUrlOutputDto>;
  getUrlByEncodedId: (encodedId: string) => Promise<UrlDto>;
};

export type UrlController = {
  shortenUrl: (req: Request, res: Response) => Promise<void>;
  redirectToLongUrl: (req: Request, res: Response) => Promise<void>;
};

export type UrlDto = {
  id: number;
  longUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUrlDto = {
  longUrl: string;
};

export type ShortenUrlInputDto = {
  longUrl: string;
};

export type ShortenUrlOutputDto = {
  shortUrl: string;
};
