// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import * as qs from 'querystring';
import * as https from 'https';
import * as jwt from 'jwt-decode';
import { WSO2TokenResponse, DecodedToken } from './authenticate.interface';

import { EncryptionsService } from '../encryptions/encryptions.service';
import { PermissionsService } from 'src/permissions/permissions.service';
import { Agent as HttpsAgent } from 'https';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { ConfigService } from 'src/config/config.service';
@Injectable()
export class AuthenticateService {
  constructor(
    private readonly configService: ConfigService,
    private readonly encryptionsService: EncryptionsService,
    private readonly permissionsService: PermissionsService,
  ) {}

  async login(user: string, password: string) {
    try {
      const url: string =
        this.configService.get('WSO2')?.URL_TOKEN ??
        'https://localhost:9443/oauth2/token';
      const data = qs.stringify({
        grant_type: 'password',
        client_id: this.configService.get('WSO2')?.CLIENT_ID,
        client_secret: this.configService.get('WSO2')?.CLIENT_SECRET,
        username: user,
        password: this.encryptionsService.decrypt(password),
        scope:
          'openid groups id_structure profile roles internal_role_mgt_view',
      });
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      /*const proxyEnv =
        this.configService.get('HTTPS_PROXY') ||
        this.configService.get('https_proxy') ||
        this.configService.get('HTTP_PROXY') ||
        this.configService.get('http_proxy');

      const httpsAgent = proxyEnv
        ? new HttpsProxyAgent(proxyEnv)
        : new HttpsAgent({ rejectUnauthorized: false }); // o true en producción
*/
      const response = await axios.post<WSO2TokenResponse>(url, data, {
        proxy: false, //TODO Arreglar para entornos que viaje la petición a traves del proxy
        headers,
        httpsAgent: new https.Agent({ rejectUnauthorized: false }), //TODO remove this in production
      });
      console.log('DecodedToken', response.data);
      const token = response.data.access_token;
      const decodedToken: DecodedToken = jwt.jwtDecode(token);

      if (!decodedToken.roles?.length) {
        throw new UnauthorizedException('El usuario no tiene roles asignados');
      }
      if (!decodedToken.scope?.length) {
        throw new UnauthorizedException(
          'El usuario no tiene permisos asignados',
        );
      }

      if (decodedToken.roles) {
        //decodedToken.roles
        const scopes = await this.permissionsService.getPermissionsForRoles(
          decodedToken.roles,
          response.data.access_token,
        );

        if (!scopes.length) {
          throw new UnauthorizedException(
            'El usuario no tiene permisos asignados',
          );
        }

        let permisos: string[] = [];

        for (const scope of scopes) {
          for (const permission of scope.permissions) {
            if (!permisos.includes(permission.value)) {
              permisos.push(permission.value);
            }
          }
        }

        return {
          success: true,
          token: decodedToken,
          source: 'wso2',
          user: {
            username: user,
            roles: decodedToken.roles,
            permissions: permisos,
          },
          message: 'Autenticación exitosa',
        };
      }
    } catch (error) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }
  async logout(accessToken: string): Promise<void> {
    const revokeUrl =
      this.configService.get('WSO2')?.REVOKE_URL ||
      'https://localhost:9443/oauth2/revoke';
    try {
      await axios.post(
        revokeUrl,
        qs.stringify({
          token: accessToken,
          client_id: this.configService.get('WSO2')?.CLIENT_ID,
          client_secret: this.configService.get('WSO2')?.CLIENT_SECRET,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          httpsAgent: new https.Agent({ rejectUnauthorized: false }), //TODO remove this in production
          timeout: 5000, // Set a timeout of 5 seconds
        },
      );
    } catch (error) {
      console.error('Error revoking access token:', error);
    }
  }
}
