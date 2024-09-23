import { Injectable } from '@nestjs/common';
import { compare, genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class PasswordService {
  private salt_number = 10;

  public async validateStrings(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword);
  }

  public async hashString(password: string) {
    const salt = genSaltSync(this.salt_number);
    return hashSync(password, salt);
  }
}
