import { ACCOUNT_TYPE, RegisterUserInput } from '@modules/auth/dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@providers/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new user and inserts data into either the personalAccount
   * or businessAccount table based on the account type.
   */
  public async createUser(data: RegisterUserInput) {
    const { accountType, ...userData } = data;

    try {
      return await this.prisma.$transaction(async (transaction) => {
        let otpCode = this.generateOpt();

        if (
          await transaction.user.findFirst({ where: { email: userData.email } })
        )
          throw new BadRequestException('Email already exist');

        if (
          await transaction.user.findFirst({ where: { phone: userData.phone } })
        )
          throw new BadRequestException('Phone number already exist');

        const user = await transaction.user.create({
          data: {
            email: userData.email,
            phone: userData.phone,
            password: await this.hashPassword(userData.password),
            accountType: accountType.toString(),
            otpCode: otpCode + '',
            otpExpiration: new Date(
              new Date().setMinutes(new Date().getMinutes() + 5),
            ),
          },
        });

        if (accountType === ACCOUNT_TYPE.PERSONAL) {
          await this.createPersonalAccount(transaction, user.id, userData);
        } else if (accountType === ACCOUNT_TYPE.BUSINESS) {
          await this.createBusinessAccount(transaction, user.id, userData);
        }

        return { user, otpCode: this.generateOpt() };
      });
    } catch (error) {
      throw new BadRequestException('User registration failed: ' + error);
    }
  }

  /**
   * Inserts data into the personalAccount table.
   */
  private async createPersonalAccount(transaction, userId: number, data: any) {
    const { personalAccount } = data;

    if (!personalAccount) {
      throw new BadRequestException('Personal account data is required');
    }

    await transaction.personalAccount.create({
      data: {
        userId,
        firstName: personalAccount.firstName,
        lastName: personalAccount.lastName,
        dateOfBirth: personalAccount.dateOfBirth,
        country: personalAccount.country,
        fullAddress: personalAccount.fullAddress,
        zipCode: personalAccount.zipCode,
      },
    });
  }

  /**
   * Inserts data into the businessAccount table.
   */
  private async createBusinessAccount(transaction, userId: number, data: any) {
    const { businessAccount } = data;

    if (!businessAccount) {
      throw new BadRequestException('Business account data is required');
    }

    await transaction.businessAccount.create({
      data: {
        userId,
        country: businessAccount.country,
        category: businessAccount.category,
        name: businessAccount.name,
        address: businessAccount.address,
        registration: businessAccount.registration,
        noOfEmployees: businessAccount.noOfEmployees,
        type: businessAccount.type,
        founder: businessAccount.founder,
        socialLink: businessAccount.socialLink,
      },
    });
  }

  // I will move this code into separate module
  private generateOpt() {
    return Math.floor(Math.random() * 900000) + 100000;
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(
    candidatePassword: string,
    currentPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(candidatePassword, currentPassword);
  }
}
