import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { Character } from './schemas/character.schema';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Characters')
@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar Personagem' })
  @ApiResponse({ status: 201, description: 'Personagem criado com sucesso' })
  async create(@Body() createCharacterDto: CreateCharacterDto): Promise<Character> {
    return this.characterService.create(createCharacterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar Personagens' })
  @ApiResponse({ status: 200, description: 'Lista de personagens retornada com sucesso' })
  findAll() {
    return this.characterService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar Personagem por Identificador' })
  @ApiResponse({ status: 200, description: 'Personagem encontrado' })
  findOne(@Param('id') id: string) {
    return this.characterService.findOne(id);
  }

  @Put(':id/adventurer-name')
  @ApiOperation({ summary: 'Atualizar Nome Aventureiro' })
  @ApiResponse({ status: 200, description: 'Nome aventureiro atualizado com sucesso' })
  updateAdventurerName(
    @Param('id') id: string,
    @Body('adventurerName') adventurerName: string,
  ) {
    return this.characterService.updateAdventurerName(id, adventurerName);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover Personagem' })
  @ApiResponse({ status: 200, description: 'Personagem removido com sucesso' })
  remove(@Param('id') id: string) {
    return this.characterService.remove(id);
  }
} 