import { Match } from '@modules/user/decorators/match.decorator';
import {
  ApiProperty,
  ApiPropertyOptional
} from '@nestjs/swagger';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import {
  IsAlpha,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateIf,
} from 'class-validator';

export enum ACCOUNT_TYPE {
  PERSONAL,
  BUSINESS,
}

export enum CATEGORY_TYPE {
  RETAIL,
  SERVICE,
  MANUFACTURING,
}

export enum BUSINESS_TYPE {
  LLC,
  CORPORATION,
  SOLE_PROPRIETORSHIP,
}

class PersonalAccountInput {
  @ApiProperty({ example: 'John' })
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

  @ApiProperty({ example: 'Doe' })
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

  @ApiProperty({ example: '1990-01-01' })
  @IsString()
  dateOfBirth: string;

  @ApiProperty({ example: 'United States' })
  @IsString()
  country: string;

  @ApiProperty({ example: '123 Main St, Anytown, USA' })
  @IsString()
  fullAddress: string;

  @ApiPropertyOptional({ example: '12345' })
  @IsString()
  @IsOptional()
  zipCode: string;
}

class BusinessAccountInput {
  @ApiProperty({ example: 'United States' })
  @IsString()
  @Length(1, 50)
  country: string;

  @ApiProperty({ example: CATEGORY_TYPE.RETAIL })
  @IsEnum(CATEGORY_TYPE)
  category: CATEGORY_TYPE;

  @ApiProperty({ example: 'Acme Corporation' })
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty({ example: '123 Main St, Anytown, USA' })
  @IsString()
  @Length(1, 200)
  address: string;

  @ApiProperty({ example: '123456789' })
  @IsString()
  @Length(1, 50)
  registration: string;

  @ApiProperty({ example: 100 })
  @IsInt()
  noOfEmployees: number;

  @ApiProperty({ example: BUSINESS_TYPE.CORPORATION })
  @IsEnum(BUSINESS_TYPE)
  type: BUSINESS_TYPE;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @Length(1, 40)
  founder: string;

  @ApiProperty({ example: 'https://www.example.com' })
  @IsString()
  @Length(1, 200)
  socialLink: string;
}

export class RegisterUserInput {
  @ApiProperty({
    enum: ACCOUNT_TYPE,
    default: ACCOUNT_TYPE.PERSONAL,
    example: ACCOUNT_TYPE.PERSONAL,
  })
  @IsEnum(ACCOUNT_TYPE)
  accountType: ACCOUNT_TYPE;

  @ApiProperty({
    description: 'Business Account',
    type: PersonalAccountInput,
    required: false,
  })
  @ValidateIf((o) => o.accountType === ACCOUNT_TYPE.PERSONAL)
  @Type(() => PersonalAccountInput)
  personalAccount?: PersonalAccountInput;

  @ApiProperty({
    description: 'Business Account',
    type: BusinessAccountInput,
    required: false,
  })
  @IsOptional()
  @ValidateIf((o) => o.accountType === ACCOUNT_TYPE.BUSINESS)
  @Type(() => BusinessAccountInput)
  businessAccount?: BusinessAccountInput;

  @ApiProperty({ example: 'example@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'Strong(!)Password' })
  @IsString()
  @Length(6, 20)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;

  @ApiProperty({ example: 'Strong(!)Password' })
  @Match('password', { message: 'Passwords do not match' })
  @Length(6, 20)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  confirmPassword: string;
}
