// src/config/config.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import * as fs from 'fs';
import { ConfigService } from './config.service';

@Controller('config')
export class ConfigController {
  constructor(private configService: ConfigService) {}

  @Get()
  getConfig() {
    return this.configService.config;
  }

  @Post()
  updateConfig(@Body() config: any) {
    fs.writeFileSync('config.json', JSON.stringify(config, null, 2));
    this.configService.loadConfig();
    return { message: 'Configuración actualizada' };
  }
  @Get('routes')
  getRoutes() {
    return this.configService.getRoutes();
  }

  @Post('routes')
  updateRoutes(@Body() routes: any) {
    fs.writeFileSync('routes.json', JSON.stringify(routes, null, 2));
    this.configService.loadRoutes();
    return { message: 'Rutas actualizadas' };
  }
}
