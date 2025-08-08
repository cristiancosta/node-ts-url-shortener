// Services.
import { urlService } from '../../../src/services/url';

// Utils.
import { encodeBase62, decodeBase62 } from '../../../src/utils/base62';

// Types.
import { UrlDto, UrlRepository, UrlService } from '../../../src/types/url';

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

describe('urlService', () => {
  let service: UrlService;
  let mockRepository: jest.Mocked<UrlRepository>;
  const mockUrl: UrlDto = {
    id: 123,
    longUrl: 'https://test.com',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockRepository = {
      getUrlById: jest.fn(),
      getUrlByLongUrl: jest.fn(),
      createUrl: jest.fn()
    };
    service = urlService(mockRepository);
  });

  describe('shortenUrl', () => {
    it('debería devolver shortUrl si la URL ya existe', async () => {
      mockRepository.getUrlByLongUrl.mockResolvedValue(mockUrl);
      encodeBase62Mock.mockReturnValue('encoded123');

      const result = await service.shortenUrl({ longUrl: mockUrl.longUrl });

      expect(mockRepository.getUrlByLongUrl).toHaveBeenCalledWith(
        mockUrl.longUrl
      );
      expect(encodeBase62Mock).toHaveBeenCalledWith(mockUrl.id);
      expect(result).toEqual({ shortUrl: 'http://localhost:3000/encoded123' });
      expect(mockRepository.createUrl).not.toHaveBeenCalled();
    });

    it('debería crear una nueva URL si no existe', async () => {
      mockRepository.getUrlByLongUrl.mockResolvedValue(null);
      mockRepository.createUrl.mockResolvedValue(mockUrl);
      encodeBase62Mock.mockReturnValue('encoded123');

      const result = await service.shortenUrl({ longUrl: mockUrl.longUrl });

      expect(mockRepository.getUrlByLongUrl).toHaveBeenCalledWith(
        mockUrl.longUrl
      );
      expect(mockRepository.createUrl).toHaveBeenCalledWith({
        longUrl: mockUrl.longUrl
      });
      expect(encodeBase62Mock).toHaveBeenCalledWith(mockUrl.id);
      expect(result).toEqual({ shortUrl: 'http://localhost:3000/encoded123' });
    });
  });

  describe('getUrlByEncodedId', () => {
    it('debería devolver la URL si existe el ID', async () => {
      decodeBase62Mock.mockReturnValue(123);
      mockRepository.getUrlById.mockResolvedValue(mockUrl);

      const result = await service.getUrlByEncodedId('encoded123');

      expect(decodeBase62Mock).toHaveBeenCalledWith('encoded123');
      expect(mockRepository.getUrlById).toHaveBeenCalledWith(123);
      expect(result).toBe(mockUrl);
    });

    it('debería lanzar un error si no existe la URL', async () => {
      decodeBase62Mock.mockReturnValue(999);
      mockRepository.getUrlById.mockResolvedValue(null);

      await expect(service.getUrlByEncodedId('encoded999')).rejects.toThrow();
      expect(decodeBase62Mock).toHaveBeenCalledWith('encoded999');
      expect(mockRepository.getUrlById).toHaveBeenCalledWith(999);
    });
  });
});
