import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema({ collection: 'clients' })
export class Client {
  @Prop()
  clientId: string;

  @Prop()
  email: string;

  @Prop()
  age: number;

  @Prop([String])
  favoriteFoods: string[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);
