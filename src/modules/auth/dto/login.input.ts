import { IsEmail, MinLength, MaxLength, IsString } from 'class-validator';

export class LoginInput {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}

export class LoginResponse {
  @IsString()
  token: string;

  @IsString()
  refreshToken: string;
}
