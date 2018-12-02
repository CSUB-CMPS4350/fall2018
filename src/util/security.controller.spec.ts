import { Test, TestingModule } from '@nestjs/testing';
import { SecurityController } from './security.controller';

describe('Security Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [SecurityController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: SecurityController = module.get<SecurityController>(SecurityController);
    expect(controller).toBeDefined();
  });
});
