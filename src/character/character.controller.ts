import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { Character } from './schemas/character.schema';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateAdventurerNameDto } from './dto/update-adventurer-name.dto';

@ApiTags('Characters')
@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  @ApiOperation({ summary: 'Register Character', description: 'Create a new character with specified attributes.' })
  @ApiResponse({
    status: 201,
    description: 'Character successfully created',
    schema: {
      example: {
        id: 'char001',
        name: 'Aragorn',
        adventurerName: 'Strider',
        class: 'Warrior',
        level: 5,
        strength: 6,
        defense: 4
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Validation failed: Strength and defense must sum to 10' })
  @ApiResponse({ status: 400, description: 'Invalid class provided' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Body() createCharacterDto: CreateCharacterDto): Promise<Character> {
    return this.characterService.create(createCharacterDto);
  }

  @Get()
  @ApiOperation({ summary: 'List Characters' })
  @ApiResponse({ status: 200, description: 'Character list successfully returned' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findAll() {
    return this.characterService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find Character by ID' })
  @ApiResponse({ status: 200, description: 'Character found' })
  @ApiResponse({ status: 404, description: 'Character not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findOne(@Param('id') id: string) {
    return this.characterService.findOne(id);
  }

  @Put(':id/adventurer-name')
  @ApiOperation({ summary: 'Update Adventurer Name' })
  @ApiResponse({ status: 200, description: 'Adventurer name successfully updated' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiResponse({ status: 404, description: 'Character not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  updateAdventurerName(
    @Param('id') id: string,
    @Body() updateAdventurerNameDto: UpdateAdventurerNameDto,
  ) {
    return this.characterService.updateAdventurerName(id, updateAdventurerNameDto.adventurerName);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove Character' })
  @ApiResponse({ status: 200, description: 'Character successfully removed' })
  @ApiResponse({ status: 404, description: 'Character not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  remove(@Param('id') id: string) {
    return this.characterService.remove(id);
  }
}