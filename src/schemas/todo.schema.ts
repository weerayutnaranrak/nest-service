import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose, { Document } from 'mongoose';
// import { User } from './user.schema';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop()
  name: string;

  @Prop()
  description: string;

  //   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  //   user: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
