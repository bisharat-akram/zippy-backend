import { PrismaModule } from 'src/providers/prisma/prisma.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService, PasswordService } from '@modules/auth/services';
import { HelperModule } from '@providers/helpers/helper.module';
// import { SessionModule } from '@modules/session/session.module';
// import { SessionService } from '@modules/session/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_PRIVATE_KEY,
    }),
    UserModule,
    PrismaModule,
    HelperModule,
    // SessionModule,
  ],
  providers: [AuthService, PasswordService,
    //  SessionService
    ],
  controllers: [AuthController],
})
export class AuthModule {}
