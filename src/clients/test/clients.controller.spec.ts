import { Test } from '@nestjs/testing';
import { ClientsController } from '../clients.controller';
import { ClientService } from '../clients.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { Client } from '../schemas/client.schema';
import { clientStub } from './stubs/client.stub';

jest.mock('../clients.service');

describe('ClientsController', () => {
  let clientsController: ClientsController;
  let clientsService: ClientService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [ClientsController],
      providers: [ClientService],
    }).compile();

    clientsController = moduleRef.get<ClientsController>(ClientsController);
    clientsService = moduleRef.get<ClientService>(ClientService);
    jest.clearAllMocks();
  });

  describe('getClient', () => {
    describe('when getClient is called', () => {
      let client: Client;

      beforeEach(async () => {
        client = await clientsController.getClient(clientStub().clientId);
      });

      test('then it should call clientsService', () => {
        expect(clientsService.getClientById).toBeCalledWith(
          clientStub().clientId,
        );
      });

      test('then it should return a client', () => {
        expect(client).toEqual(clientStub());
      });
    });
  });

  describe('getClients', () => {
    describe('when getClients is called', () => {
      let clients: Client[];

      beforeEach(async () => {
        clients = await clientsController.getClients();
      });

      test('then it should call clientsService', () => {
        expect(clientsService.getClients).toHaveBeenCalled();
      });

      test('then it should return clients', () => {
        expect(clients).toEqual([clientStub()]);
      });
    });
  });

  describe('createClient', () => {
    describe('when createClient is called', () => {
      let client: Client;
      let createClientDto: CreateClientDto;

      beforeEach(async () => {
        createClientDto = {
          email: clientStub().email,
          age: clientStub().age,
        };
        client = await clientsController.createClient(createClientDto);
      });

      test('then it should call clientsService', () => {
        expect(clientsService.createClient).toHaveBeenCalledWith(
          createClientDto.email,
          createClientDto.age,
        );
      });

      test('then it should return the created client', () => {
        expect(client).toEqual(clientStub());
      });
    });
  });

  describe('updateClient', () => {
    describe('when updateClient is called', () => {
      let client: Client;
      let updateClientDto: UpdateClientDto;

      beforeEach(async () => {
        updateClientDto = {
          favoriteFoods: ['banana', 'apple'],
          age: 33,
        };
        client = await clientsController.updateClient(
          clientStub().clientId,
          updateClientDto,
        );
      });

      test('then it should call clientsService', () => {
        expect(clientsService.updateClient).toHaveBeenCalledWith(
          clientStub().clientId,
          updateClientDto,
        );
      });

      test('then it should return the updated client', () => {
        expect(client).toEqual(clientStub());
      });
    });
  });
});
