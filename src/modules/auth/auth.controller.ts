import { AuthService } from '@modules/auth/services';
import { User } from '@common/generated/client';
import { IPayloadUserJwt, ISessionAuthToken } from '@common/global-interfaces';
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import {
  LoginInput,
  LoginResponse,
  RegisterUserInput,
} from '@modules/auth/dto';
import { SessionService } from '@modules/session/services';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
  ) {}

  @Post('/login')
  @ApiOkResponse({ description: 'Login response', type: LoginResponse })
  public async login(@Body() data: LoginInput): Promise<ISessionAuthToken> {
    const { email, password } = data;
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload: IPayloadUserJwt = {
      id: user.id,
    };
    const authToken: ISessionAuthToken =
      await this.authService.generateAuthTokenFromLogin(payload);

    await this.sessionService.addSession({
      userId: user.id,
      ...authToken,
    });

    return authToken;
  }

  @Post('/register')
  public async register(@Body() data: RegisterUserInput): Promise<User> {
    return await this.authService.register(data);
  }
}
