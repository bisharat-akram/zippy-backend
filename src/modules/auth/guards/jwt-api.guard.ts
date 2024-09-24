// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { ApiUserService } from '@modules/api-user/services';
// import { API_USER_STATUS } from '@common/generated/client';

// @Injectable()
// export class JwtApiGuard implements CanActivate {
//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly apiUserService: ApiUserService,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const token = JwtApiGuard.extractTokenFromHeader(request);
//     if (!token) {
//       throw new UnauthorizedException();
//     }
//     try {
//       const jwtDecoded = await this.jwtService.decode(token);
//       if (!jwtDecoded || !jwtDecoded['id']) {
//         throw new UnauthorizedException();
//       }
//       const apiUser = await this.apiUserService.getApiUserByUniqueInput({
//         clientId: jwtDecoded['id'],
//       });
//       if (apiUser.status !== API_USER_STATUS.ACTIVE) {
//         throw new UnauthorizedException();
//       }
//       await this.jwtService.verifyAsync(token, {
//         secret: apiUser.clientSecret,
//       });
//       const user = {
//         ...apiUser['user'],
//       };
//       delete user['user'];
//       request['user'] = user;
//     } catch {
//       throw new UnauthorizedException();
//     }
//     return true;
//   }

//   private static extractTokenFromHeader(request: any): string | undefined {
//     const [type, token] = request.headers.authorization?.split(' ') ?? [];
//     return type === 'Bearer' ? token : undefined;
//   }
// }
