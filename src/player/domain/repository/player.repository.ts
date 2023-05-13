import { StatusEnum } from "@app/shared/infraestructure/enums/status.enum";
import { EntityRepository, Repository } from "typeorm";
import { PlayerCreateDto } from "../dto/player-create.dto";
import { PlayerEntity } from "../model/player.entity";
import { MessageResponse } from "@app/shared/domain/model/message.response";
import { MessageEnum } from "@app/shared/infraestructure/enums/message.enum";
import { HttpStatus } from "@nestjs/common";


@EntityRepository(PlayerEntity)
export class PlayerRepository extends Repository<PlayerEntity> {
    
  async createPlayer(playerDto: PlayerCreateDto): Promise<any> {
    const player = new PlayerEntity();
    Object.assign(player, playerDto);
    
    console.log(player);
    try {
      player.userCreation = '123';
      await player.save();
      
    } catch (e) {
      console.log(e);
      return new MessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, MessageEnum.ENTITY_ERROR_CREATE, null);
    }
    return new MessageResponse(HttpStatus.OK, MessageEnum.PLAYER_CREATED, player);
  }  
}