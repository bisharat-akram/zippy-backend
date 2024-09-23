import { Injectable } from '@nestjs/common';
import { generate } from 'randomstring';

@Injectable()
export class UtilsService {
  public static getCodeByLength(length: number) {
    return generate({
      length,
      charset: 'numeric',
    });
  }
}
