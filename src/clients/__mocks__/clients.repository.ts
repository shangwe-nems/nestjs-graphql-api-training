import { clientStub } from '../test/stubs/client.stub';

export const ClientRepository = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(clientStub()),
  find: jest.fn().mockResolvedValue([clientStub()]),
  create: jest.fn().mockResolvedValue(clientStub()),
  findOneAndUpdate: jest.fn().mockResolvedValue(clientStub()),
  deleteMany: jest.fn().mockResolvedValue(true),
});
