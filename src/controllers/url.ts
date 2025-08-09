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
    const { url } = req.body as { url: string };
    const result = await service.shortenUrl({ url });
    res.send(result);
  };

  const redirectToUrl = async (req: Request, res: Response): Promise<void> => {
    const { encodedId } = req.params as { encodedId: string };
    const result = await service.getUrlByEncodedId(encodedId);
    res.redirect(result.url);
  };

  return {
    shortenUrl,
    redirectToUrl
  };
};
