import { RegisterUserInput } from '@modules/auth/dto';
import { AuthService } from '@modules/auth/services';
import { Body, Controller, Post } from '@nestjs/common';
// import { SessionService } from '@modules/session/services';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    // private readonly sessionService: SessionService,
  ) {}

  @Post('/register')
  public async register(@Body() data: RegisterUserInput): Promise<any> {
    return await this.authService.register(data);
  }

  @Post('/resend')
  public async resendOtp(@Body() data: RegisterUserInput): Promise<any> {
    return await this.authService.register(data);
  }

  @Post('/verify-otp')
  public async verifyOtp(@Body() data: RegisterUserInput): Promise<any> {
    return await this.authService.register(data);
  }
}
