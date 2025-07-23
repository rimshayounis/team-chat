import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'channels', timestamps: true }) // ✅ optional but helpful
export class Channel extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Team', required: true }) // ✅ ref must match class name of Team
  teamId: Types.ObjectId;
}

export type ChannelDocument = Channel & Document;
export const ChannelSchema = SchemaFactory.createForClass(Channel);
