import { PrismaService } from 'src/providers/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/providers/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SessionModule } from '@modules/session/session.module';
import { SessionService } from '@modules/session/services';
import { ApiUserController } from '@modules/api-user/api-user.controller';
import { ApiUserService } from '@modules/api-user/services';
import { ApiKeyValidatorConstraint } from '@modules/api-user/decorators/api-key.validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_PRIVATE_KEY,
    }),
    PrismaModule,
    SessionModule,
  ],
  providers: [
    PrismaService,
    SessionService,
    ApiUserService,
    ApiKeyValidatorConstraint,
  ],
  controllers: [ApiUserController],
})
export class ApiUserModule {}
