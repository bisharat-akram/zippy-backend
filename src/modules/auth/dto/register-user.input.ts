import {
  IsEmail,
  IsString,
  Length,
  IsAlpha,
  Matches,
  IsMobilePhone,
} from 'class-validator';
import {
  UserEmailExitsValidator,
  UserPhoneExitsValidator,
} from '@modules/user/decorators';
import { Match } from '@modules/user/decorators/match.decorator';
import { Transform, TransformFnParams } from 'class-transformer';

export class RegisterUserInput {
  @IsAlpha()
  @Length(2, 25)
  @Transform(
    ({ value }: TransformFnParams) =>
      value
        ?.trim()
        .toLowerCase()
        .trim()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' '),
  )
  firstName: string;

  @IsAlpha()
  @Length(2, 25)
  @Transform(
    ({ value }: TransformFnParams) =>
      value
        ?.trim()
        .toLowerCase()
        .trim()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' '),
  )
  lastName: string;

  @UserEmailExitsValidator()
  @IsEmail()
  email: string;

  @UserPhoneExitsValidator()
  @IsMobilePhone()
  phone: string;

  @IsString()
  @Length(6, 20)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;

  @Match('password', { message: 'Passwords do not match' })
  @Length(6, 20)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  confirmPassword: string;
}
