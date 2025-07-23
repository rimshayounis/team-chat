import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'teams', timestamps: true }) // ✅ important addition
export class Team extends Document {
  @Prop({ required: true })
  name: string;
}

export type TeamDocument = Team & Document;
export const TeamSchema = SchemaFactory.createForClass(Team);
