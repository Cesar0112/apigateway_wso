import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as CryptoJS from 'crypto-js';
@Injectable()
export class EncryptionsService {
  private readonly parsedKey: CryptoJS.lib.WordArray;
  private readonly parsedIV: CryptoJS.lib.WordArray;

  constructor(private readonly cfg: ConfigService) {
    const password = this.cfg
      .get<string>('ENCRYPTION_PASSWORD', 'IkIopwlWorpqUj')
      .trim();
    this.parsedKey = CryptoJS.SHA256(password);
    this.parsedIV = CryptoJS.MD5(password);
  }
  encrypt(plainText: string): string {
    const safe = String(plainText ?? '').trim();
    const messageUtf8 = CryptoJS.enc.Utf8.parse(safe);
    const encrypted = CryptoJS.AES.encrypt(messageUtf8, this.parsedKey, {
      iv: this.parsedIV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }

  decrypt(encryptedText: string): string {
    if (!encryptedText?.trim()) return '';
    const decrypted = CryptoJS.AES.decrypt(encryptedText, this.parsedKey, {
      iv: this.parsedIV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
