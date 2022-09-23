import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    lowercase: true,
    required: true,
  })
  name: string;

  @Prop({
    unique: true,
    lowercase: true,
    index: true,
  })
  username: string;

  @Prop({
    unique: true,
    required: true,
    lowercase: true,
  })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
