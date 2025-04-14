import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MagicalItemService } from './magical-item.service';
import { CreateMagicalItemDto } from './dto/create-magical-item.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Magical Items')
@Controller('magical-items')
export class MagicalItemController {
  constructor(private readonly magicalItemService: MagicalItemService) {}

  @Post()
  @ApiOperation({ summary: 'Register Magical Item', description: 'Create a new magical item with specified attributes.' })
  @ApiResponse({
    status: 201,
    description: 'Magical item successfully created',
    schema: {
      example: {
        id: 'item001',
        name: 'Sword of Power',
        type: 'Weapon',
        strength: 10,
        defense: 0
      }
    }
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 400, description: 'Validation failed: Invalid magical item type or attributes' })
  create(@Body() createMagicalItemDto: CreateMagicalItemDto) {
    return this.magicalItemService.create(createMagicalItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'List Magical Items' })
  @ApiResponse({ status: 200, description: 'Magical items list successfully returned' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findAll() {
    return this.magicalItemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find Magical Item by ID' })
  @ApiResponse({ status: 200, description: 'Magical item found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 400, description: 'Validation failed: Invalid magical item type or attributes' })
  findOne(@Param('id') id: string) {
    return this.magicalItemService.findOne(id);
  }

  @Get('character/:characterId')
  @ApiOperation({ summary: 'List Magical Items by Character' })
  @ApiResponse({ status: 200, description: 'Magical items list for character successfully returned' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 400, description: 'Validation failed: Invalid magical item type or attributes' })
  findByCharacterId(@Param('characterId') characterId: string) {
    return this.magicalItemService.findByCharacterId(characterId);
  }

  @Get('character/:characterId/amulet')
  @ApiOperation({ summary: 'Find Character Amulet' })
  @ApiResponse({ status: 200, description: 'Character amulet found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 400, description: 'Validation failed: Invalid magical item type or attributes' })
  findAmuletByCharacterId(@Param('characterId') characterId: string) {
    return this.magicalItemService.findAmuletByCharacterId(characterId);
  }

  @Put(':id/assign/:characterId')
  @ApiOperation({ summary: 'Assign Magical Item to Character' })
  @ApiResponse({ status: 200, description: 'Magical item successfully assigned to character' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 400, description: 'Validation failed: Invalid magical item type or attributes' })
  assignToCharacter(
    @Param('id') id: string,
    @Param('characterId') characterId: string,
  ) {
    return this.magicalItemService.assignToCharacter(id, characterId);
  }

  @Put(':id/remove/:characterId')
  @ApiOperation({ summary: 'Remove Magical Item from Character' })
  @ApiResponse({ status: 200, description: 'Magical item successfully removed from character' })
  @ApiResponse({ status: 404, description: 'Item not found or not associated with the character' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 400, description: 'Validation failed: Invalid magical item type or attributes' })
  removeFromCharacter(
    @Param('id') id: string,
    @Param('characterId') characterId: string,
  ) {
    return this.magicalItemService.removeFromCharacter(id, characterId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove Magical Item' })
  @ApiResponse({ status: 200, description: 'Magical item successfully removed' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 400, description: 'Validation failed: Invalid magical item type or attributes' })
  remove(@Param('id') id: string) {
    return this.magicalItemService.delete(id);
  }
}