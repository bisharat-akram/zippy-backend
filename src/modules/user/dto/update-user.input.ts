import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserInput {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  @MinLength(3)
  password?: string;

  @IsOptional()
  @IsString()
  currentHashedRefreshToken?: string;
}
