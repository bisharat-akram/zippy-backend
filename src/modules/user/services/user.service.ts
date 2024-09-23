import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserInput } from '../dto';
import { User, Prisma } from '@common/generated/client';
import { PrismaService } from '@providers/prisma/prisma.service';
import { PasswordService } from '@modules/auth/services/password.service';
import { RegisterUserInput } from '@modules/auth/dto';
import { ConfigService } from '@nestjs/config';
import { AesService } from '@providers/helpers/services/aes.service';
import { ACTIVITY_TYPE } from '@common/generated/client';
import {
  VERIFICATION_CODE_TYPE,
  VERIFICATION_DESTINATION,
} from '@common/generated/client';
import { VerificationService } from '@modules/auth-verification/services';
import { UtilsService } from '@providers/helpers/services/utils.service';

@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService,
    private aesService: AesService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly verificationService: VerificationService,
  ) {}

  public async getUserByUniqueInput(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<User> {
    return this.prisma.user.findUnique({
      where,
    });
  }

  public async updateOneUser(
    where: Prisma.UserWhereUniqueInput,
    data: UpdateUserInput,
  ): Promise<User> {
    try {
      return await this.prisma.user.update({
        data,
        where,
      });
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async createOneUser(data: RegisterUserInput) {
    return this.prisma.$transaction(
      async (tx) => {
        const user = await tx.user.create({
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: await this.passwordService.hashString(data.password),
            phone: data.phone,
          },
        });
        await this.verificationService.generateNewVerificationCode(
          {
            userId: user.id,
            code: await this.passwordService.hashString(
              UtilsService.getCodeByLength(6),
            ),
            type: VERIFICATION_CODE_TYPE.EMAIL_VERIFICATION,
            destination: VERIFICATION_DESTINATION.EMAIL,
          },
          tx,
        );
        await this.verificationService.generateNewVerificationCode(
          {
            userId: user.id,
            code: await this.passwordService.hashString(
              UtilsService.getCodeByLength(6),
            ),
            type: VERIFICATION_CODE_TYPE.PHONE_VERIFICATION,
            destination: VERIFICATION_DESTINATION.PHONE,
          },
          tx,
        );
        await tx.activity.create({
          data: {
            type: ACTIVITY_TYPE.EMAIL_VERIFICATION,
            userId: user.id,
            details: {
              description: 'Email verification request sent.',
            },
          },
        });
        return user;
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      },
    );
  }
}
