export interface WSO2TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  id_token?: string;
  refresh_token?: string;
  refresh_token_expires_in?: number;
  id_token_expires_in?: number;
  session_state?: string;
  error?: string;
  error_description?: string;
  error_uri?: string;
}
export interface SessionTimers {
  warningTimer?: NodeJS.Timeout;
  logoutTimer?: NodeJS.Timeout;
}
export interface DecodedToken {
  roles?: string[] | string;
  scope?: string[] | string;
  aud?: string | string[];
  azp?: string;
  groups?: string[];
}

export interface IAuthenticationService {
  login(user: string, password: string): Promise<any>;
  logout(sessionId: string): Promise<void>;
  refresh(sessionId: string): Promise<boolean>;
}
export const AUTH_SERVICE_TOKEN = Symbol('AUTH_SERVICE');
