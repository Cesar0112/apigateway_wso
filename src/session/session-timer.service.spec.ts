import { Test, TestingModule } from '@nestjs/testing';
import { SessionTimerService } from './session-timer.service';

describe('SessionTimerService', () => {
  let service: SessionTimerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionTimerService],
    }).compile();

    service = module.get<SessionTimerService>(SessionTimerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
