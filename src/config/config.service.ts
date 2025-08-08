// config.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Config, RoutesConfig } from './config';

@Injectable()
export class ConfigService {
  public config: Config;
  public routes: RoutesConfig;
  constructor() {
    this.loadConfig();
    this.loadRoutes();
    fs.watchFile(path.resolve('config.json'), () => {
      this.loadConfig();
      console.log('⚙️ Configuración recargada');
    });
    fs.watchFile(path.resolve('routes.json'), () => {
      this.loadRoutes();
      console.log('⚙️ Configuración recargada');
    });
  }

  public loadConfig() {
    const raw = fs.readFileSync('config.json', 'utf8');
    this.config = JSON.parse(raw) as Config;
  }
  public loadRoutes() {
    const raw = fs.readFileSync('routes.json', 'utf8');
    this.routes = JSON.parse(raw) as RoutesConfig;
  }
  get(key: string): any {
    return this.config[key];
  }
  getRoutes() {
    return this.routes || {};
  }
  getRoute(
    method: 'PUT' | 'POST' | 'PATCH' | 'GET' | 'DELETE',
    endpoint: string,
  ): string[] {
    return this.routes[method + endpoint] as string[];
  }
}
