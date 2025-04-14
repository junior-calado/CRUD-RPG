import { IsString } from 'class-validator';

export class UpdateAdventurerNameDto {
  @IsString()
  adventurerName: string;
}