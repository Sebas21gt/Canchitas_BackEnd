import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { PlayerCreateDto } from '../domain/dto/player-create.dto';
import { PlayerUpdateDto } from '../domain/dto/player-update.dto';
import { PlayerService } from './player.service';


@Controller('/player')
@UsePipes(new ValidationPipe())
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async playerCreate(@Body() playerCreateDto:PlayerCreateDto): Promise<any> {
    return await this.playerService.playerCreate(playerCreateDto);
  }

  @Put('/:id')
  playerUpdate(@Param('id') id:number, @Body() playerUpdateDto: PlayerUpdateDto): any {
    return this.playerService.playerUpdate(id, playerUpdateDto);
  }

  @Get()
  async getPlayers(): Promise <any> {
    return await this.playerService.getPlayers();
  }

  @Delete('/:id')
  playerDelete(@Param('id') id:number): any {
    return this.playerService.playerDelete(id);
  }
}