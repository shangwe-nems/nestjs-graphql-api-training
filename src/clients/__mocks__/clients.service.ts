import { clientStub } from '../test/stubs/client.stub';

export const ClientService = jest.fn().mockReturnValue({
  getClientById: jest.fn().mockResolvedValue(clientStub()),
  getClients: jest.fn().mockResolvedValue([clientStub()]),
  createClient: jest.fn().mockResolvedValue(clientStub()),
  updateClient: jest.fn().mockResolvedValue(clientStub()),
});
