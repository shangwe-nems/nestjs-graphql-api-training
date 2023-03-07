import { Client } from '../../../clients/schemas/client.schema';
import { MockModel } from '../../../database/test/support/mock.model';
import { clientStub } from '../stubs/client.stub';

export class ClientModel extends MockModel<Client> {
  protected entityStub = clientStub();
}
