import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { match } from 'path-to-regexp';

type PermissionsMap = Record<string, string[]>;

@Injectable()
export class PermissionsGuard implements CanActivate {
  private readonly permissionsMap: PermissionsMap;

  constructor() {
    const filePath = path.resolve(__dirname, '../permissions/permissions.json');
    this.permissionsMap = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const method = req.method.toUpperCase();
    const url = req.route.path;
    const user = req.user;
    const matchedKey = Object.keys(this.permissionsMap).find((key) => {
      const [m, p] = key.split(' ');
      if (m !== method) return false;
      return match(p, { decode: decodeURIComponent })(url) !== false;
    });

    if (!matchedKey) return true;

    const requiredPerms = this.permissionsMap[matchedKey];
    const userPerms: string[] = user?.permissions || [];

    const ok = requiredPerms.some((p) => userPerms.includes(p));
    if (!ok) throw new ForbiddenException('Insufficient permissions');
    return true;
  }
}
