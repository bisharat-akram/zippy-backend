import {
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsString,
} from 'class-validator';

export class CreateUserInput {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password!: string;
}
