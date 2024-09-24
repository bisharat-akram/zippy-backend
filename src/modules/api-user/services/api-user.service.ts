import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@providers/prisma/prisma.service';

@Injectable()
export class ApiUserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // public async addMember(
  //   userId: string,
  //   data: NewApiUserInput,
  // ): Promise<ApiUser> {
  //   return this.prisma.apiUser.create({
  //     data: {
  //       ...data,
  //       userId,
  //     },
  //   });
  // }

  // public async generateToken(data: ApiTokenInput): Promise<string> {
  //   return this.jwtService.signAsync(
  //     {
  //       id: data.clientId,
  //     },
  //     {
  //       expiresIn: 60 * 5,
  //       secret: data.clientSecret,
  //     },
  //   );
  // }

  // public async listApiUsers(
  //   userId: string,
  //   pagination: PaginationInput,
  // ): Promise<ApiUser[]> {
  //   return this.prisma.apiUser.findMany({
  //     where: {
  //       userId,
  //     },
  //     skip: (pagination.pageNumber - 1) * pagination.perPage,
  //     take: pagination.perPage,
  //   });
  // }

  // public async getApiUserByUniqueInput(
  //   where: Prisma.ApiUserWhereUniqueInput,
  //   include?: Prisma.ApiUserInclude,
  // ): Promise<ApiUser> {
  //   return this.prisma.apiUser.findUnique({
  //     where,
  //     include,
  //   });
  // }
}
