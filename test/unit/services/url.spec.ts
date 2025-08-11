// Errors.
import { NotFoundError } from '../../../src/errors/not-found';

// Services.
import { urlService } from '../../../src/services/url';

// Utils.
import { encodeBase62, decodeBase62 } from '../../../src/utils/base62';

// Types.
import {
  UrlCache,
  UrlDto,
  UrlRepository,
  UrlService
} from '../../../src/types/url';

jest.mock('../../../src/utils/base62', () => ({
  encodeBase62: jest.fn(),
  decodeBase62: jest.fn()
}));

jest.mock('../../../src/configuration', () => ({
  configuration: {
    server: { host: 'http://localhost', port: 3000 }
  }
}));

const encodeBase62Mock = encodeBase62 as jest.Mock;
const decodeBase62Mock = decodeBase62 as jest.Mock;

describe('Url', () => {
  let service: UrlService;
  let mockRepository: jest.Mocked<UrlRepository>;
  let mockCache: jest.Mocked<UrlCache>;
  const mockUrl: UrlDto = {
    id: 123,
    url: 'https://test.com',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockRepository = {
      getById: jest.fn(),
      getByUrl: jest.fn(),
      createUrl: jest.fn()
    };
    mockCache = {
      getUrlByEncodedId: jest.fn(),
      setUrlToEncodedId: jest.fn()
    };
    service = urlService(mockRepository, mockCache);
  });

  describe('shortenUrl', () => {
    it('Should return shortUrl if url already exist', async () => {
      mockRepository.getByUrl.mockResolvedValue(mockUrl);
      encodeBase62Mock.mockReturnValue('encoded123');

      const result = await service.shortenUrl({ url: mockUrl.url });

      expect(mockRepository.getByUrl).toHaveBeenCalledWith(mockUrl.url);
      expect(encodeBase62Mock).toHaveBeenCalledWith(mockUrl.id);
      expect(result).toEqual({ shortUrl: 'http://localhost:3000/encoded123' });
      expect(mockRepository.createUrl).not.toHaveBeenCalled();
    });

    it('Should create a new url if it does not exist', async () => {
      mockRepository.getByUrl.mockResolvedValue(null);
      mockRepository.createUrl.mockResolvedValue(mockUrl);
      encodeBase62Mock.mockReturnValue('encoded123');

      const result = await service.shortenUrl({ url: mockUrl.url });

      expect(mockRepository.getByUrl).toHaveBeenCalledWith(mockUrl.url);
      expect(mockRepository.createUrl).toHaveBeenCalledWith({
        url: mockUrl.url
      });
      expect(encodeBase62Mock).toHaveBeenCalledWith(mockUrl.id);
      expect(result).toEqual({ shortUrl: 'http://localhost:3000/encoded123' });
    });
  });

  describe('getUrlByEncodedId', () => {
    it('Should return url if id exist', async () => {
      decodeBase62Mock.mockReturnValue(123);
      mockRepository.getById.mockResolvedValue(mockUrl);

      const result = await service.getUrlByEncodedId('encoded123');

      expect(decodeBase62Mock).toHaveBeenCalledWith('encoded123');
      expect(mockRepository.getById).toHaveBeenCalledWith(123);
      expect(result).toBe(mockUrl.url);
    });

    it('Should throw NotFoundError if url does not exist', async () => {
      decodeBase62Mock.mockReturnValue(999);
      mockRepository.getById.mockResolvedValue(null);

      await expect(service.getUrlByEncodedId('encoded999')).rejects.toThrow(
        NotFoundError
      );
      expect(decodeBase62Mock).toHaveBeenCalledWith('encoded999');
      expect(mockRepository.getById).toHaveBeenCalledWith(999);
    });
  });
});
