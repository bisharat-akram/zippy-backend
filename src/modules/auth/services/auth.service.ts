import { environment } from '@common/environment';
import { IPayloadUserJwt } from '@common/global-interfaces';
import { PasswordService } from '@modules/auth/services/password.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@common/generated/client';
import { UserService } from '@modules/user/services';
import { RegisterUserInput } from '@modules/auth/dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  // public async validateUser(email: string, password: string) {
  //   const where: Prisma.UserWhereUniqueInput = {
  //     email: email,
  //   };
  //   const user = await this.userService.getUserByUniqueInput(where);
  //   if (!user) {
  //     throw new BadRequestException('Invalid credentials');
  //   }
  //   const isMatchedPassword = await this.passwordService.validateStrings(
  //     password,
  //     user.password,
  //   );
  //   if (!isMatchedPassword) {
  //     throw new BadRequestException('Invalid credentials');
  //   }
  //   return user;
  // }

  public async generateAuthTokenFromLogin(payload: IPayloadUserJwt) {
    const envJwt = environment().jwtOptions;
    const accessTokenExpiresIn = envJwt.accessTokenExpiresIn;
    const refreshTokenExpiresIn = envJwt.accessTokenExpiresIn;

    return {
      token: await this.jwtService.signAsync(payload, {
        expiresIn: accessTokenExpiresIn,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: refreshTokenExpiresIn,
      }),
    };
  }

  public async resetCurrentHashesRefreshToken(
    where: Prisma.UserWhereUniqueInput,
    refreshToken: string,
  ) {
    const currentHashedRefreshToken =
      await this.passwordService.hashString(refreshToken);

    // return this.userService.updateOneUser(where, {
    //   currentHashedRefreshToken,
    // });
  }

  public async register(data: RegisterUserInput) {
    return this.userService.createUser(data);
  }
}
