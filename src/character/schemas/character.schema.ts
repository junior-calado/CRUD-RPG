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

  @Prop({ type: [{ type: String, ref: 'MagicalItem' }] })
  magicalItems: string[];
}

export const CharacterSchema = SchemaFactory.createForClass(Character);

CharacterSchema.pre('validate', async function(next) {
  if (this.strength + this.defense !== 10) {
    this.invalidate('strength', 'Strength and defense must sum to 10');
  }

  const amuletCount = await this.model('MagicalItem').countDocuments({
    characterId: this.id,
    type: 'Amuleto',
  });

  if (amuletCount > 1) {
    this.invalidate('magicalItems', 'A character can only have one amulet');
  }

  next();
});