import { IsString, IsEnum, IsInt, Min, Max, ValidateIf } from 'class-validator';

export enum MagicalItemType {
  WEAPON = 'Weapon',
  ARMOR = 'Armor',
  AMULET = 'Amulet',
}

export class CreateMagicalItemDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsEnum(MagicalItemType)
  type: MagicalItemType;

  @ValidateIf(o => o.type !== MagicalItemType.ARMOR)
  @IsInt()
  @Min(0)
  @Max(10)
  strength: number;

  @ValidateIf(o => o.type !== MagicalItemType.WEAPON)
  @IsInt()
  @Min(0)
  @Max(10)
  defense: number;
}