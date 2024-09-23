import { Prisma } from '@common/generated/client';
import {
  ValidatorConstraint,
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { UserService } from '@modules/user/services';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ name: 'user', async: true })
export class UserPhoneExitsValidatorConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UserService) {}

  /**
   * Method should return true, if name is not taken
   */
  public async validate(phone: string, args: ValidationArguments) {
    const where: Prisma.UserWhereUniqueInput = {
      phone,
    };
    try {
      const check = await this.userService.getUserByUniqueInput(where);
      return !check;
    } catch (error) {
      return true;
    }
  }
  defaultMessage(args: ValidationArguments) {
    return 'User with $property $value already exists';
  }
}

export function UserPhoneExitsValidator(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UserPhoneExitsValidatorConstraint,
    });
  };
}
