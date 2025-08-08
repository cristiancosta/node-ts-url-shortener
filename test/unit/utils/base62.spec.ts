import { encodeBase62, decodeBase62 } from '../../../src/utils/base62';

describe('Base62 encoding/decoding', () => {
  it('Should encode 0 as "0"', () => {
    expect(encodeBase62(0)).toBe('0');
  });

  it('Should decode "0" as 0', () => {
    expect(decodeBase62('0')).toBe(0);
  });

  it('Should encode and decode numbers consistently', () => {
    const numbers = [1, 10, 61, 62, 125, 999, 123456789];
    for (const num of numbers) {
      const encoded = encodeBase62(num);
      const decoded = decodeBase62(encoded);
      expect(decoded).toBe(num);
    }
  });

  it('Should handle large numbers correctly', () => {
    const largeNumber = Number.MAX_SAFE_INTEGER;
    const encoded = encodeBase62(largeNumber);
    const decoded = decodeBase62(encoded);
    expect(decoded).toBe(largeNumber);
  });

  it('Should not produce leading zeros in encoding', () => {
    const encoded = encodeBase62(62);
    expect(encoded.startsWith('0')).toBe(false);
  });
});
