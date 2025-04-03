import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
        request['user'] = { username: decoded.username, id: decoded.id };
        return true;
      } catch (error) {
        console.error('Token inválido:', error.message);
        return false;
      }
    }

    return false;
  }
}
