import { PrismaService } from 'src/providers/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { PasswordService } from '@modules/auth/services';
import { UserService } from '@modules/user/services';
import { PrismaModule } from 'src/providers/prisma/prisma.module';
import { HelperModule } from '@providers/helpers/helper.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from '@modules/user/user.controller';
import { JwtModule } from '@nestjs/jwt';

import { VerificationService } from '@modules/auth-verification/services';
import { VerificationModule } from '@modules/auth-verification/verification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_PRIVATE_KEY,
    }),
    PrismaModule,
    HelperModule,
    VerificationModule,
  ],
  providers: [UserService, PasswordService, PrismaService, VerificationService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
