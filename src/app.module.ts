import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ApiUserModule } from '@modules/api-user/api-user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    UserModule,
    AuthModule,
    ApiUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
