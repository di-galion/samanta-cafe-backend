import { Test, TestingModule } from '@nestjs/testing';
import { SailsController } from './sails.controller';
import { SailsService } from './sails.service';

describe('SailsController', () => {
  let controller: SailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SailsController],
      providers: [SailsService],
    }).compile();

    controller = module.get<SailsController>(SailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
