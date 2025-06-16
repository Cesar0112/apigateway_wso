import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js'; // Adjust the path as necessary
@Injectable()
export class EncryptionsService {
  decryptPassword(encryptedText: string, password: string): string {
    const parsedKey = CryptoJS.SHA256(password);
    const parsedIV = CryptoJS.MD5(password);
    const decrypted = CryptoJS.AES.decrypt(encryptedText, parsedKey, {
      iv: parsedIV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
