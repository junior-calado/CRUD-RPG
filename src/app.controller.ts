import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Documentation')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'API Documentation' })
  getHello(): string {
    return `
      <h1>RPG Game Management System API</h1>
      <h2>Character Endpoints:</h2>
      <ul>
        <li>POST /characters - Cadastrar Personagem</li>
        <li>GET /characters - Listar Personagens</li>
        <li>GET /characters/:id - Buscar Personagem por Identificador</li>
        <li>PUT /characters/:id/adventurer-name - Atualizar Nome Aventureiro</li>
        <li>DELETE /characters/:id - Remover Personagem</li>
      </ul>
      <h2>Magical Items Endpoints:</h2>
      <ul>
        <li>POST /magical-items - Cadastrar Item Mágico</li>
        <li>GET /magical-items - Listar Itens Mágicos</li>
        <li>GET /magical-items/:id - Buscar Item Mágico por Identificador</li>
        <li>PUT /magical-items/:id/assign/:characterId - Adicionar Item Mágico ao Personagem</li>
        <li>GET /magical-items/character/:characterId - Listar Itens Mágicos por Personagem</li>
        <li>PUT /magical-items/:id/remove - Remover Item Mágico do Personagem</li>
        <li>GET /magical-items/character/:characterId/amulet - Buscar Amuleto do Personagem</li>
      </ul>
    `;
  }
} 