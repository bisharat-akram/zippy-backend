import { JwtModuleOptions } from '@nestjs/jwt';

export interface IEnvironment {
  readonly siteUrl?: string;
  readonly serverPort: number;
  readonly isDevelopment: boolean;
  readonly isProduction: boolean;
  readonly session?: {
    secret: string;
  };
  readonly jwtOptions?: IJwtOptions;
}

export interface ISessionOption {
  secret: string;
}

export interface IJwtOptions extends JwtModuleOptions {
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}
