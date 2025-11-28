import { Test, TestingModule } from '@nestjs/testing';
import { InstrutorService } from './instrutor.service';

describe('InstrutorService', () => {
  let service: InstrutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstrutorService],
    }).compile();

    service = module.get<InstrutorService>(InstrutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
