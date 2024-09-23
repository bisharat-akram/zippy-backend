import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AesService {
  key: string;
  encryptionIV: string;
  constructor(private configService: ConfigService) {
    this.key = crypto
      .createHash('sha512')
      .update(configService.get('AES_SECRET_KEY'))
      .digest('hex')
      .substring(0, 32);

    this.encryptionIV = crypto
      .createHash('sha512')
      .update(configService.get('AES_SECRET_IV'))
      .digest('hex')
      .substring(0, 16);
  }

  public encrypt(data: string): string {
    const cipher = crypto.createCipheriv(
      this.configService.get('AES_ENCRYPTION_METHOD'),
      this.key,
      this.encryptionIV,
    );
    return Buffer.from(
      cipher.update(data, 'utf8', 'hex') + cipher.final('hex'),
    ).toString('base64');
  }

  public decrypt(encryptedData: string): string {
    const buff = Buffer.from(encryptedData, 'base64');
    const decipher = crypto.createDecipheriv(
      this.configService.get('AES_ENCRYPTION_METHOD'),
      this.key,
      this.encryptionIV,
    );
    return (
      decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
      decipher.final('utf8')
    ); // Decrypts data and converts to utf8
  }
}
