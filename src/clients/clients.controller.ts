import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ClientService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './schemas/client.schema';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientService) {}

  @Get(':clientId')
  async getClient(@Param('clientId') clientId: string): Promise<Client> {
    return this.clientsService.getClientById(clientId);
  }

  @Get()
  async getClients(): Promise<Client[]> {
    return this.clientsService.getClients();
  }

  @Post()
  async createClient(
    @Body() createClientDto: CreateClientDto,
  ): Promise<Client> {
    return this.clientsService.createClient(
      createClientDto.email,
      createClientDto.age,
    );
  }

  @Patch(':clientId')
  async updateClient(
    @Param('clientId') clientId: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    return this.clientsService.updateClient(clientId, updateClientDto);
  }
}
