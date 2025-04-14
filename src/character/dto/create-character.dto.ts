import { IsString, IsEnum, IsInt, Min, Max, IsOptional } from 'class-validator';

export enum CharacterClass {
  WARRIOR = 'Warrior',
  MAGE = 'Mage',
  ARCHER = 'Archer',
  ROGUE = 'Rogue',
  BARD = 'Bard',
}

export class CreateCharacterDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  adventurerName?: string;

  @IsEnum(CharacterClass)
  class: CharacterClass;

  @IsInt()
  @Min(1)
  @Max(10)
  level: number;

  @IsInt()
  @Min(1)
  @Max(10)
  strength: number;

  @IsInt()
  @Min(1)
  @Max(10)
  defense: number;
}