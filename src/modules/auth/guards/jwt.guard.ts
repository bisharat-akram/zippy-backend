// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// // import { SessionService } from '@modules/session/services';

// @Injectable()
// export class JwtGuard implements CanActivate {
//   constructor(
//     private readonly jwtService: JwtService,
//     // private readonly sessionService: SessionService,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const token = JwtGuard.extractTokenFromHeader(request);
//     if (!token) {
//       throw new UnauthorizedException();
//     }
//     try {
//       const jwtVerified = await this.jwtService.verifyAsync(token);
//       const session = await this.sessionService.getSessionByToken({
//         userId: jwtVerified.id,
//         token,
//       });
//       if (!session || !session.status) {
//         throw new UnauthorizedException();
//       }
//       request['user'] = session['user'];
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
