import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character, CharacterDocument } from './schemas/character.schema';
import { CreateCharacterDto } from './dto/create-character.dto';
import { MagicalItemService } from '../magical-item/magical-item.service';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
    private magicalItemService: MagicalItemService,
  ) { }

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const createdCharacter = new this.characterModel(createCharacterDto);
    return createdCharacter.save();
  }

  async findAll(): Promise<Character[]> {
    return this.characterModel.find().exec();
  }

  async findOne(id: string): Promise<Character & { totalStrength: number; totalDefense: number }> {
    const character = await this.characterModel
      .findOne({ id })
      .populate({
        path: 'magicalItems',
        select: 'name strength defense type',
      })
      .exec();

    if (!character) {
      throw new NotFoundException('Character not found');
    }

    const totalStrength = character.strength + (character.magicalItems as any[]).reduce((sum, item) => sum + (item.strength || 0), 0);
    const totalDefense = character.defense + (character.magicalItems as any[]).reduce((sum, item) => sum + (item.defense || 0), 0);

    return {
      ...character.toObject(),
      totalStrength,
      totalDefense,
    };
  }

  async updateAdventurerName(id: string, adventurerName: string): Promise<Character | null> {
    return this.characterModel.findOneAndUpdate(
      { id },
      { adventurerName },
      { new: true },
    ).exec();
  }

  async remove(id: string): Promise<Character | null> {
    return this.characterModel.findOneAndDelete({ id }).exec();
  }

  async getTotalAttributes(id: string): Promise<{ totalStrength: number; totalDefense: number }> {
    const character = await this.findOne(id);
    if (!character) {
      throw new NotFoundException('Character not found');
    }

    const magicalItems = await this.magicalItemService.findByCharacterId(id);

    const totalStrength = magicalItems.reduce(
      (sum, item) => sum + item.strength,
      character.strength,
    );

    const totalDefense = magicalItems.reduce(
      (sum, item) => sum + item.defense,
      character.defense,
    );

    return {
      totalStrength,
      totalDefense,
    };
  }
}