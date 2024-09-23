import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/providers/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { SessionService } from '@modules/session/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    PrismaModule,
  ],
  providers: [SessionService],
})
export class SessionModule {}
