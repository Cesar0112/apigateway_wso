import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { EncryptionsService } from '../encryptions/encryptions.service';
import { ConfigService } from '../config/config.service';
import { PermissionsService } from '../permissions/permissions.service';
import { SessionModule } from '../session/session.module';
import { AuthenticateController } from './auth.controller';
describe('AuthService', () => {
  let service: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SessionModule],
      providers: [
        ConfigService,
        AuthService,
        EncryptionsService,
        PermissionsService,
      ],
      controllers: [AuthenticateController],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('Debe retornar el token', async () => {
    expect(
      await service.login(
        'superadmin',
        'fNxH7jDwkuVtei93ExsMGU5yEKVyrhMAAFZgXxSl3zo=',
      ),
    ).toEqual(
      expect.objectContaining({
        success: true,
        token: expect.objectContaining({
          roles: 'superadmin',
        }),
        user: expect.objectContaining({
          username: 'superadmin',
          roles: 'superadmin',
        }),
        message: 'Autenticación exitosa',
      } as Partial<ReturnType<typeof service.login>>),
    );
  });
});
