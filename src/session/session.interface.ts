interface Cookie {
  originalMaxAge: number;
  expires: string;
  secure: boolean;
  httpOnly: boolean;
  path: string;
  sameSite: string;
}
interface Permissions {
  permissions: string[];
}
export interface SessionRedis {
  cookie: Cookie;
  permissions: Permissions;
}
