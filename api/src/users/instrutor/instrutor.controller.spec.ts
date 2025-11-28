import { Test, TestingModule } from '@nestjs/testing';
import { InstrutorController } from './instrutor.controller';
import { InstrutorService } from './instrutor.service';

describe('InstrutorController', () => {
  let controller: InstrutorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstrutorController],
      providers: [InstrutorService],
    }).compile();

    controller = module.get<InstrutorController>(InstrutorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
