//user.schema
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;
  @Prop({
    required: true,
    type: String,
    minlength: [7, 'Password must be at least 7 characters long'],
  })
  password: string;

  
}
export type UserDocument= User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
