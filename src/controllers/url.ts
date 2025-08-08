import { DataSource } from 'typeorm';
import { Request, Response } from 'express';

// Services.
import { urlService } from '../services/url';

// Repositories.
import { urlRepository } from '../repositories/url';

// Types.
import { UrlController } from '../types/url';

export const urlController = (dataSource: DataSource): UrlController => {
  const service = urlService(urlRepository(dataSource));

  const shortenUrl = async (req: Request, res: Response): Promise<void> => {
    const { longUrl } = req.body as { longUrl: string };
    const result = await service.shortenUrl({ longUrl });
    res.send(result);
  };

  const redirectToLongUrl = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { encodedId } = req.params as { encodedId: string };
    const result = await service.getUrlByEncodedId(encodedId);
    res.redirect(result.longUrl);
  };

  return {
    shortenUrl,
    redirectToLongUrl
  };
};
