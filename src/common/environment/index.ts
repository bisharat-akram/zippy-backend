import { IEnvironment } from './environment.interface';
import { Algorithm } from 'jsonwebtoken';

export const environment = () => {
  return {
    siteUrl: process.env.SITE_URL,
    serverPort: Number(process.env.SERVER_PORT),
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',

    // JWT
    jwtOptions: {
      privateKey: process.env.JWT_PRIVATE_KEY,
      publicKey: process.env.JWT_PUBLIC_KEY,
      secret: process.env.JWT_PRIVATE_KEY,
      secretOrPrivateKey: process.env.JWT_PRIVATE_KEY,
      signOptions: {
        algorithm: process.env.JWT_ALGORITHM as Algorithm,
        expiresIn: Number(process.env.JWT_EXPIRE_TIME),
      },
      accessTokenExpiresIn: 60 * 60 * 2, //2h
      refreshTokenExpiresIn: 60 * 60 * 24 * 30, // 30 days
    },

    session: {
      secret: process.env.SESSION_SECRET,
    },
  } as IEnvironment;
};
