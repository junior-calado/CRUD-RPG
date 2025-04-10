import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CharacterClass } from '../dto/create-character.dto';

export type CharacterDocument = Character & Document;

@Schema({ timestamps: true })
export class Character {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  adventurerName: string;

  @Prop({ required: true, enum: CharacterClass })
  class: CharacterClass;

  @Prop({ required: true, min: 1, max: 10 })
  level: number;

  @Prop({ required: true, min: 1, max: 10 })
  strength: number;

  @Prop({ required: true, min: 1, max: 10 })
  defense: number;
}

export const CharacterSchema = SchemaFactory.createForClass(Character); 