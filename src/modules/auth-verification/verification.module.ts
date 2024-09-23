import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/providers/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { VerificationService } from '@modules/auth-verification/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    PrismaModule,
  ],
  providers: [VerificationService],
})
export class VerificationModule {}
