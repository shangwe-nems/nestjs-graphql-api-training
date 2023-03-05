import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ClientsRepository } from './clients.repository';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './schemas/client.schema';

@Injectable()
export class ClientService {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async getClientById(clientId: string): Promise<Client> {
    return this.clientsRepository.findOne({ clientId });
  }

  async getClients(): Promise<Client[]> {
    return this.clientsRepository.find({});
  }

  async createClient(email: string, age: number): Promise<Client> {
    return this.clientsRepository.create({
      clientId: uuidv4(),
      email,
      age,
      favoriteFoods: [],
    });
  }

  async updateClient(
    clientId: string,
    clientUpdates: UpdateClientDto,
  ): Promise<Client> {
    return this.clientsRepository.findOneAndUpdate({ clientId }, clientUpdates);
  }
}
