import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MagicalItem, MagicalItemDocument } from './schemas/magical-item.schema';
import { CreateMagicalItemDto } from './dto/create-magical-item.dto';
import { MagicalItemType } from './dto/create-magical-item.dto';

@Injectable()
export class MagicalItemService {
  constructor(
    @InjectModel(MagicalItem.name)
    private magicalItemModel: Model<MagicalItemDocument>,
  ) { }

  async create(createMagicalItemDto: CreateMagicalItemDto): Promise<MagicalItem> {
    const createdItem = new this.magicalItemModel(createMagicalItemDto);
    return createdItem.save();
  }

  async findAll(): Promise<MagicalItem[]> {
    return this.magicalItemModel.find().exec();
  }

  async findOne(id: string): Promise<MagicalItem | null> {
    return this.magicalItemModel.findOne({ id }).exec();
  }

  async findAmuletByCharacterId(characterId: string): Promise<MagicalItem | null> {
    return this.magicalItemModel.findOne({
      characterId,
      type: MagicalItemType.AMULET,
    }).exec();
  }

  async assignToCharacter(itemId: string, characterId: string): Promise<MagicalItem | null> {
    const item = await this.magicalItemModel.findOne({ id: itemId });

    if (!item) {
      throw new Error('Item not found');
    }

    if (item.type === MagicalItemType.AMULET) {
      const existingAmulet = await this.findAmuletByCharacterId(characterId);
      if (existingAmulet) {
        throw new Error('Character already has an amulet');
      }
    }

    return this.magicalItemModel.findOneAndUpdate(
      { id: itemId },
      { characterId },
      { new: true },
    ).exec();
  }

  async removeFromCharacter(itemId: string): Promise<MagicalItem | null> {
    return this.magicalItemModel.findOneAndUpdate(
      { id: itemId },
      { characterId: null },
      { new: true },
    ).exec();
  }

  async delete(id: string): Promise<MagicalItem | null> {
    return this.magicalItemModel.findOneAndDelete({ id }).exec();
  }

  async findByCharacterId(characterId: string): Promise<MagicalItem[]> {
    return this.magicalItemModel.find({ characterId }).exec();
  }
  

} 