import { Request, Response } from 'express';

export type UrlRepository = {
  getById: (id: number) => Promise<UrlDto | null>;
  getByUrl: (url: string) => Promise<UrlDto | null>;
  createUrl: (dto: CreateUrlDto) => Promise<UrlDto>;
};

export type UrlService = {
  shortenUrl: (dto: ShortenUrlInputDto) => Promise<ShortenUrlOutputDto>;
  getUrlByEncodedId: (encodedId: string) => Promise<UrlDto>;
};

export type UrlController = {
  shortenUrl: (req: Request, res: Response) => Promise<void>;
  redirectToUrl: (req: Request, res: Response) => Promise<void>;
};

export type UrlDto = {
  id: number;
  url: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUrlDto = {
  url: string;
};

export type ShortenUrlInputDto = {
  url: string;
};

export type ShortenUrlOutputDto = {
  shortUrl: string;
};
