import { Injectable } from '@nestjs/common';
import { Session, Prisma } from '@common/generated/client';
import { PrismaService } from '@providers/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SessionService {
  constructor(
    private configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  public async addSession(
    data: Prisma.SessionUncheckedCreateInput,
  ): Promise<Session> {
    return this.prisma.session.create({
      data,
    });
  }

  public async getSessionByToken(
    where: Prisma.SessionWhereInput,
  ): Promise<Session> {
    return this.prisma.session.findFirst({
      where,
      include: {
        user: true,
      },
    });
  }
}
