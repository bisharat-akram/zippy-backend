import { ApiUserController } from '@modules/api-user/api-user.controller';
import { ApiKeyValidatorConstraint } from '@modules/api-user/decorators/api-key.validator';
import { ApiUserService } from '@modules/api-user/services';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/providers/prisma/prisma.module';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_PRIVATE_KEY,
    }),
    PrismaModule,
  ],
  providers: [
    PrismaService,
    ApiUserService,
    ApiKeyValidatorConstraint,
  ],
  controllers: [ApiUserController],
})
export class ApiUserModule {}
