import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@modules/auth/guards';
import { CurrentUser } from '@modules/user/decorators';
import { User } from '@common/generated/client';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor() {}

  @Get('/profile')
  public async profile(
    @CurrentUser() user: User,
  ): Promise<Pick<User, 'firstName' | 'lastName' | 'email'>> {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }
}
