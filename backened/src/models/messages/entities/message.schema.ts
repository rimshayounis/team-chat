// message.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ required: true})
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  sender: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Channel' })
  channel: Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);


