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

export interface DecodedToken {
  roles?: string[] | string;
  scope?: string[];
  aud?: string | string[];
  azp?: string;
  groups?: string[];
}
