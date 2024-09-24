import { Prisma } from '@common/generated/client';
import {
  ValidatorConstraint,
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ApiUserService } from '@modules/api-user/services';

@Injectable()
@ValidatorConstraint({ name: 'api_key', async: true })
export class ApiKeyValidatorConstraint
//  implements ValidatorConstraintInterface
  {
  constructor(private readonly apiUserService: ApiUserService) {}

  /**
   * Method should return true, if name is not taken
   */
  // public async validate(id: string, args: ValidationArguments) {
  //   if (!args.object) {
  //     return false;
  //   }
  //   const where: Prisma.ApiUserWhereUniqueInput = {
  //     clientId: args.object['clientId'],
  //     clientSecret: args.object['clientSecret'],
  //     userId: args.object['userId'],
  //   };
  //   try {
  //     const check = await this.apiUserService.getApiUserByUniqueInput(where);
  //     return !!check;
  //   } catch (error) {
  //     return true;
  //   }
  // }
  defaultMessage(args: ValidationArguments) {
    return `Api User with provided api key doesn't exist`;
  }
}

export function ApiKeyValidator(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ApiKeyValidatorConstraint,
    });
  };
}
