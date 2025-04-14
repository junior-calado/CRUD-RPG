import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MagicalItemService } from './magical-item.service';
import { CreateMagicalItemDto } from './dto/create-magical-item.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Magical Items')
@Controller('magical-items')
export class MagicalItemController {
  constructor(private readonly magicalItemService: MagicalItemService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar Item Mágico' })
  @ApiResponse({ status: 201, description: 'Item mágico criado com sucesso' })
  create(@Body() createMagicalItemDto: CreateMagicalItemDto) {
    return this.magicalItemService.create(createMagicalItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar Itens Mágicos' })
  @ApiResponse({ status: 200, description: 'Lista de itens mágicos retornada com sucesso' })
  findAll() {
    return this.magicalItemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar Item Mágico por Identificador' })
  @ApiResponse({ status: 200, description: 'Item mágico encontrado' })
  findOne(@Param('id') id: string) {
    return this.magicalItemService.findOne(id);
  }

  @Get('character/:characterId')
  @ApiOperation({ summary: 'Listar Itens Mágicos por Personagem' })
  @ApiResponse({ status: 200, description: 'Lista de itens mágicos do personagem retornada com sucesso' })
  findByCharacterId(@Param('characterId') characterId: string) {
    return this.magicalItemService.findByCharacterId(characterId);
  }

  @Get('character/:characterId/amulet')
  @ApiOperation({ summary: 'Buscar Amuleto do Personagem' })
  @ApiResponse({ status: 200, description: 'Amuleto do personagem encontrado' })
  findAmuletByCharacterId(@Param('characterId') characterId: string) {
    return this.magicalItemService.findAmuletByCharacterId(characterId);
  }

  @Put(':id/assign/:characterId')
  @ApiOperation({ summary: 'Adicionar Item Mágico ao Personagem' })
  @ApiResponse({ status: 200, description: 'Item mágico adicionado ao personagem com sucesso' })
  assignToCharacter(
    @Param('id') id: string,
    @Param('characterId') characterId: string,
  ) {
    return this.magicalItemService.assignToCharacter(id, characterId);
  }

  @Put(':id/remove')
  @ApiOperation({ summary: 'Remover Item Mágico do Personagem' })
  @ApiResponse({ status: 200, description: 'Item mágico removido do personagem com sucesso' })
  removeFromCharacter(@Param('id') id: string) {
    return this.magicalItemService.removeFromCharacter(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover Item Mágico' })
  @ApiResponse({ status: 200, description: 'Item mágico removido com sucesso' })
  remove(@Param('id') id: string) {
    return this.magicalItemService.delete(id);
  }
} 