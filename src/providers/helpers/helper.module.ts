import { Module } from '@nestjs/common';
import { AesService } from './services/aes.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
  ],
  providers: [AesService],
  exports: [AesService],
})
export class HelperModule {}
