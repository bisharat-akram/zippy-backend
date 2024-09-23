import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserContextInterceptor implements NestInterceptor {
  constructor(private type?: NonNullable<'query' | 'body' | 'params'>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (this.type && request[this.type]) {
      request[this.type]['userId'] = request?.user['user']['id'];
    }
    return next.handle();
  }
}
