import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsNotEmpty()
  @IsOptional()
  age: number;

  @Field({ nullable: true })
  @IsOptional()
  isSubscribed?: boolean;

  @Field()
  @IsNotEmpty()
  userId: string;
}
