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

MagicalItemSchema.pre('validate', async function(next) {
  // Ensure the type is one of the allowed values
  if (!Object.values(MagicalItemType).includes(this.type)) {
    this.invalidate('type', 'Invalid magical item type');
  }

  // Validate attributes based on type
  if (this.type === MagicalItemType.WEAPON && this.defense !== 0) {
    this.invalidate('defense', 'Weapons must have 0 defense');
  }
  if (this.type === MagicalItemType.ARMOR && this.strength !== 0) {
    this.invalidate('strength', 'Armor must have 0 strength');
  }
  if (this.type === MagicalItemType.AMULET) {
    const amuletCount = await this.model('MagicalItem').countDocuments({
      characterId: this.characterId,
      type: MagicalItemType.AMULET,
    });
    if (amuletCount > 0 && !this.isNew) {
      this.invalidate('type', 'A character can only have one amulet');
    }
  }

  // Validate maximum values for strength and defense
  if (this.strength > 10) {
    this.invalidate('strength', 'Strength cannot exceed 10');
  }
  if (this.defense > 10) {
    this.invalidate('defense', 'Defense cannot exceed 10');
  }

  // Ensure strength and defense are not both zero
  if (this.strength === 0 && this.defense === 0) {
    this.invalidate('attributes', 'Item cannot have both strength and defense as 0');
  }

  next();
});