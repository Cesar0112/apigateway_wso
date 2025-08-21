import {
  Controller,
  Post,
  Body,
  Req,
  UsePipes,
  Session,
  Get,
  UseInterceptors,
  HttpCode,
  BadRequestException,
  InternalServerErrorException,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JoiValidationPipe } from 'src/pipes/password-grant/password-grant.pipe';
import { UserPasswordSchema } from 'src/pipes/validation-schemas/userpassword';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Session as ExpressSession, SessionData } from 'express-session';
import { EncryptionResponseInterceptor } from 'src/encryption-response/encryption-response.interceptor';

interface CustomSession extends ExpressSession {
  accessToken?: string;
  user?: any;
  permissions?: string[];
}

interface RequestWithSession extends Request {
  session: ExpressSession & Partial<SessionData>;
}

@UseInterceptors(EncryptionResponseInterceptor)
@Controller('authenticate')
export class AuthenticateController {
  constructor(private readonly authenticateService: AuthService) {}
  @ApiTags('Autenticación')
  @UsePipes(new JoiValidationPipe(UserPasswordSchema))
  @ApiBody({ schema: { example: { user: 'usuario', password: 'contraseña' } } })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  @Post()
  @HttpCode(200)
  async login(
    @Session() session: Record<string, any>,
    @Body() body: { user: string; password: string },
  ): Promise<any> {
    const { user, password } = body;

    const result = await this.authenticateService.login(user, password);

    session.permissions = result?.user?.permissions;
    session.token = result?.token;

    return {
      success: true,
      message: 'Authentication successful',
      permissions: result?.user?.permissions,
    };
  }
  @ApiTags('Desautenticación')
  @ApiResponse({ status: 200, description: 'Logout exitoso' })
  @Post('logout')
  async logout(
    @Req() req: RequestWithSession,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    if (!req.session) {
      throw new BadRequestException('No active session found');
    }
    try {
      await this.authenticateService.logout(req.sessionID);
    } catch (error) {
      throw new InternalServerErrorException('Logout Failed', error);
    }
    await new Promise<void>((resolve, reject) => {
      req.session.destroy?.((err) => {
        if (err)
          return reject(new InternalServerErrorException('Logout failed'));

        res.clearCookie('apigateway_sid');
        resolve();
      });
    });

    return {
      success: true,
      message: 'Logout successful',
    };
  }
  @Get('test')
  test(@Session() session: Record<string, any>) {
    session.accessToken = 'hola';
    // This is just a test endpoint to check if the session and cookies are working
    //console.log('session.id', session.id);

    return 'Session and cookies are working';
  }
}
