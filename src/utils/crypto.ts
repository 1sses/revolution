import CryptoJS from 'crypto-js';

const SOME_SECRET_KEY = 'SOME_SECRET_KEY_1488';

export const encrypt = (data: string): string => {
  return CryptoJS.AES.encrypt(data, SOME_SECRET_KEY).toString();
};

export const decrypt = (data: string): string => {
  const bytes = CryptoJS.AES.decrypt(data, SOME_SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
