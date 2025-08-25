import { Test, TestingModule } from '@nestjs/testing';
import { AuthTimerService } from './auth-timer.service';

describe('AuthTimerService', () => {
  let service: AuthTimerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthTimerService],
    }).compile();

    service = module.get<AuthTimerService>(AuthTimerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
