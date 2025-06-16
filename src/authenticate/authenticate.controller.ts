import {
  Controller,
  Post,
  Body,
  Req,
  UsePipes,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { JoiValidationPipe } from 'src/pipes/password-grant/password-grant.pipe';
import { UserPasswordSchema } from 'src/pipes/validation-schemas/userpassword';
import { SetSessionInterceptor } from 'src/interceptors/set-session/set-session.interceptor';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { Session } from 'express-session';

interface CustomSession extends Session {
  accessToken?: string;
  user?: any;
  permissions?: string[];
}

interface RequestWithSession extends Request {
  session: CustomSession;
}

@Controller('authenticate')
export class AuthenticateController {
  constructor(private readonly authenticateService: AuthenticateService) {}
  @ApiTags('Autenticación')
  @Post()
  @UsePipes(new JoiValidationPipe(UserPasswordSchema))
  @UseInterceptors(SetSessionInterceptor)
  @ApiBody({ schema: { example: { user: 'usuario', password: 'contraseña' } } })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  async login(
    @Req() req: RequestWithSession,
    @Body() body: { user: string; password: string },
  ): Promise<any> {
    const { user, password } = body;

    const result = await this.authenticateService.login(user, password);

    return {
      success: true,
      message: 'Authentication successful',
      permissions: result?.user?.permissions,
    };
  }
  @ApiTags('Desautenticación')
  @Post('logout')
  @ApiResponse({ status: 200, description: 'Logout exitoso' })
  async logout(@Req() req: RequestWithSession): Promise<any> {
    if (!req.session.accessToken) {
      throw new Error('No active session found');
    }
    await this.authenticateService.logout(req.session.accessToken);
    req.session.destroy?.(() => {});
    return {
      success: true,
      message: 'Logout successful',
    };
  }
}
