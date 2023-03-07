import { Client } from 'src/clients/schemas/client.schema';

export const clientStub = (): Client => {
  return {
    clientId: '123',
    email: 'test@example.com',
    age: 26,
    favoriteFoods: ['banana', 'papaya'],
  };
};
