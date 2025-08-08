const charset =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const base = charset.length;

export const encodeBase62 = (num: number): string => {
  if (num === 0) {
    return charset[0];
  }
  let n = num;
  let encoded = '';
  while (n > 0) {
    const remainder = n % base;
    n = Math.floor(n / base);
    encoded = charset[remainder] + encoded;
  }
  return encoded;
};

export const decodeBase62 = (str: string): number => {
  let decoded = 0;
  let power = str.length - 1;
  for (let i = 0; i < str.length; i++) {
    const charIndex = charset.indexOf(str.charAt(i));
    decoded += charIndex * base ** power;
    power--;
  }
  return decoded;
};
