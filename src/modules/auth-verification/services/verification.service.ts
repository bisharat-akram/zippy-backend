import { Injectable } from '@nestjs/common';
import {
  Prisma,
  PrismaClient,
  VerificationCode,
} from '@common/generated/client';
import { PrismaService } from '@providers/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { ITXClientDenyList } from '@prisma/client/runtime/library';

@Injectable()
export class VerificationService {
  constructor(
    private configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  public async generateNewVerificationCode(
    data: Prisma.VerificationCodeUncheckedCreateInput,
    tx?: Omit<PrismaClient, ITXClientDenyList>,
  ): Promise<VerificationCode> {
    const prismaExecutor = tx ? tx : this.prisma;
    return prismaExecutor.verificationCode.create({
      data,
    });
  }
}
