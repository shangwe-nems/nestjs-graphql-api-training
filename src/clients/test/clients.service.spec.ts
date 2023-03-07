import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { ClientRepository } from '../__mocks__/clients.repository';
import { ClientsRepository } from '../clients.repository';
import { ClientService } from '../clients.service';
import { Client } from '../schemas/client.schema';
import { clientStub } from './stubs/client.stub';
import { ClientModel } from './support/client.model';

describe('ClientService', () => {
  let clientsService: ClientService;

  describe('READ operations', () => {
    let clientsRepository: ClientsRepository;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          ClientService,
          ClientsRepository,
          {
            provide: getModelToken(Client.name),
            useClass: ClientModel,
          },
        ],
      }).compile();

      clientsRepository = moduleRef.get<ClientsRepository>(ClientsRepository);
      clientsService = moduleRef.get<ClientService>(ClientService);

      jest.clearAllMocks();
    });

    describe('getClientById', () => {
      describe('when getClientById is called', () => {
        let client: Client;

        beforeEach(async () => {
          jest.spyOn(clientsRepository, 'findOne');
          client = await clientsService.getClientById(clientStub().clientId);
        });

        test('then it should call clientsRepository', () => {
          expect(clientsRepository.findOne).toHaveBeenCalledWith({
            clientId: clientStub().clientId,
          });
        });

        test('then it should return a client', () => {
          expect(client).toEqual(clientStub());
        });
      });
    });

    describe('getClients', () => {
      describe('when getClients is called', () => {
        let client: Client[];

        beforeEach(async () => {
          jest.spyOn(clientsRepository, 'find');
          client = await clientsService.getClients();
        });

        test('then it should call clientsRepository', () => {
          expect(clientsRepository.find).toHaveBeenCalled();
        });

        test('then it should return a client', () => {
          expect(client).toEqual([clientStub()]);
        });
      });
    });

    describe('updateClient', () => {
      describe('when updateClient is called', () => {
        let client: Client;
        const clientUpdate = {
          favoriteFoods: ['apple', 'papaya'],
          age: 34,
        };

        beforeEach(async () => {
          jest.spyOn(clientsRepository, 'findOneAndUpdate');
          client = await clientsService.updateClient(
            clientStub().clientId,
            clientUpdate,
          );
        });

        test('then it should call clientsRepository', () => {
          expect(clientsRepository.findOneAndUpdate).toHaveBeenCalledWith(
            { clientId: clientStub().clientId },
            clientUpdate,
          );
        });

        test('then it should return a client', () => {
          expect(client).toEqual(clientStub());
        });
      });
    });
  });

  describe('WRITE operations', () => {
    let clientsRepository: ClientsRepository;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          ClientService,
          ClientsRepository,
          {
            provide: getModelToken(Client.name),
            useValue: ClientModel,
          },
        ],
      }).compile();
      clientsRepository = moduleRef.get<ClientsRepository>(ClientsRepository);
      clientsService = moduleRef.get<ClientService>(ClientService);
    });

    describe('createClient', () => {
      describe('when createClient is called', () => {
        let client: Client;
        let saveSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(ClientsRepository.prototype, 'create');
          client = await clientsService.createClient(
            clientStub().email,
            clientStub().age,
          );
        });

        test('then it should call clientsRepository', () => {
          expect(saveSpy).toHaveBeenCalled();
        });

        test('then it should return a client', () => {
          expect(client).toEqual(clientStub());
        });
      });
    });
  });
});
