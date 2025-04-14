import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MagicalItemType } from '../dto/create-magical-item.dto';

export type MagicalItemDocument = MagicalItem & Document;

@Schema({ timestamps: true })
export class MagicalItem {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: MagicalItemType })
  type: MagicalItemType;

  @Prop({ required: true, min: 0, max: 10 })
  strength: number;

  @Prop({ required: true, min: 0, max: 10 })
  defense: number;

  @Prop({ type: String, ref: 'Character' })
  characterId: string;
}

export const MagicalItemSchema = SchemaFactory.createForClass(MagicalItem);

MagicalItemSchema.pre('validate', function(next) {
  if (this.type === MagicalItemType.WEAPON && this.defense !== 0) {
    this.invalidate('defense', 'Weapons must have 0 defense');
  }
  if (this.type === MagicalItemType.ARMOR && this.strength !== 0) {
    this.invalidate('strength', 'Armor should have 0 strength');
  }
  if (this.strength === 0 && this.defense === 0) {
    this.invalidate('strength', 'Item cannot have both strength and defense as 0');
  }
  next();
}); 