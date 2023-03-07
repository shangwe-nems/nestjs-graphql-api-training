import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';
import { ClientsRepository } from '../clients.repository';
import { Client } from '../schemas/client.schema';
import { clientStub } from './stubs/client.stub';
import { ClientModel } from './support/client.model';

describe('ClientsRepository', () => {
  let clientsRepository: ClientsRepository;

  describe('find operations', () => {
    let clientModel: ClientModel;
    let clientFilterQuery: FilterQuery<Client>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          ClientsRepository,
          {
            provide: getModelToken(Client.name),
            useClass: ClientModel,
          },
        ],
      }).compile();

      clientsRepository = moduleRef.get<ClientsRepository>(ClientsRepository);
      clientModel = moduleRef.get<ClientModel>(getModelToken(Client.name));
      clientFilterQuery = {
        clientId: clientStub().clientId,
      };

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('when findOne is called', () => {
        let client: Client;

        beforeEach(async () => {
          jest.spyOn(clientModel, 'findOne');
          client = await clientsRepository.findOne(clientFilterQuery);
        });

        test('then it should call the clientModel', () => {
          expect(clientModel.findOne).toHaveBeenCalledWith(clientFilterQuery, {
            _id: 0,
            __v: 0,
          });
        });

        test('then it should return a client', () => {
          expect(client).toEqual(clientStub());
        });
      });
    });

    describe('find', () => {
      describe('when find is called', () => {
        let clients: Client[];

        beforeEach(async () => {
          jest.spyOn(clientModel, 'find');
          clients = await clientsRepository.find(clientFilterQuery);
        });

        test('then it should call the clientModel', () => {
          expect(clientModel.find).toHaveBeenCalledWith(clientFilterQuery);
        });

        test('then it should return clients', () => {
          expect(clients).toEqual([clientStub()]);
        });
      });
    });

    describe('findOneAndUpdate', () => {
      describe('when findOneAndUpdate is called', () => {
        let client: Client;

        beforeEach(async () => {
          jest.spyOn(clientModel, 'findOneAndUpdate');
          client = await clientsRepository.findOneAndUpdate(
            clientFilterQuery,
            clientStub(),
          );
        });

        test('then it should call the clientModel', () => {
          expect(clientModel.findOneAndUpdate).toHaveBeenCalledWith(
            clientFilterQuery,
            clientStub(),
            { new: true, upsert: true },
          );
        });

        test('then it should return clients', () => {
          expect(client).toEqual(clientStub());
        });
      });
    });
  });

  describe('create operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          ClientsRepository,
          {
            provide: getModelToken(Client.name),
            useValue: ClientModel,
          },
        ],
      }).compile();

      clientsRepository = moduleRef.get<ClientsRepository>(ClientsRepository);
    });

    describe('create', () => {
      describe('when create is called', () => {
        let client: Client;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(ClientModel.prototype, 'save');
          constructorSpy = jest.spyOn(ClientModel.prototype, 'constructorSpy');
          client = await clientsRepository.create(clientStub());
        });

        test('then it should call the clientModel', () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalledWith(clientStub());
        });

        test('then it should return clients', () => {
          expect(client).toEqual(clientStub());
        });
      });
    });
  });
});
