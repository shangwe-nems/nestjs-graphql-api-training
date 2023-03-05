import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { Client, ClientDocument } from './schemas/client.schema';

@Injectable()
export class ClientsRepository extends EntityRepository<ClientDocument> {
  constructor(@InjectModel(Client.name) clientModel: Model<ClientDocument>) {
    super(clientModel);
  }
}
