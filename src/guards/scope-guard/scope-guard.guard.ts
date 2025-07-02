import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from 'src/authenticate/authenticate.interface';

@Injectable()
export class ScopeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  /**
   * Método que verifica si el guard puede activar la ruta.
   * @param context - El contexto de ejecución.
   * @returns En dependencia de los permisos del usuario deja pasar o no.
   */

  canActivate(context: ExecutionContext): boolean {
    const requiredScopes = this.reflector.get<string[]>(
      'scope',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['Authorization'];

    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];
    const decodedJWT = jwtDecode<DecodedToken>(token) as {
      scope?: string[] | string;
    };
    if (!decodedJWT || !decodedJWT.scope) {
      return false;
    }

    const scopes = !Array.isArray(decodedJWT.scope)
      ? decodedJWT.scope?.split(' ')
      : decodedJWT.scope;
    if (!scopes || scopes.length === 0) {
      return false;
    }
    if (!requiredScopes || requiredScopes.length === 0) {
      return true; // No scopes required, allow access
    }
    return scopes.every((p) => requiredScopes.includes(p)) || false;
  }
}
