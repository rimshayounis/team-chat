import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema()
export class TeamMember extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId; // ✅ renamed from userId

  @Prop({ type: Types.ObjectId, ref: 'Team' })
  team: Types.ObjectId; // ✅ renamed from teamId

  @Prop({ enum: ['Owner', 'Admin', 'Member'], default: 'Member' })
  role: string;
}

export type TeamMemberDocument = TeamMember & Document;
export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember);
