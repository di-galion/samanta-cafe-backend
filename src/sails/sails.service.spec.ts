import { Test, TestingModule } from '@nestjs/testing';
import { SailsService } from './sails.service';

describe('SailsService', () => {
  let service: SailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SailsService],
    }).compile();

    service = module.get<SailsService>(SailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
