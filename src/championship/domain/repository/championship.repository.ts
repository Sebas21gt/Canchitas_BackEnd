import { StatusEnum } from "@app/shared/infraestructure/enums/status.enum";
import { EntityRepository, Repository } from "typeorm";
import { ChampionshipEntity } from "../model/championship.entity";
import { ChampionshipCreateDto } from "../dto/championship-create.dto";
import { MessageResponse } from "@app/shared/domain/model/message.response";
import { HttpStatus } from "@nestjs/common";
import { MessageEnum } from "@app/shared/infraestructure/enums/message.enum";

@EntityRepository(ChampionshipEntity)
export class ChampionshipRepository extends Repository<ChampionshipEntity> {
    
    async createChampionship(championshipDto: ChampionshipCreateDto): Promise<any> {
      const championship = new ChampionshipEntity();
      Object.assign(championship, championshipDto);
      console.log(championship);   
      try {
        championship.userCreation = '123';
        await championship.save();
      } catch (e) {
        console.log(e);
        return new MessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, MessageEnum.ENTITY_ERROR_CREATE, null);
      }
      return new MessageResponse(HttpStatus.OK, MessageEnum.CHAMPIONSHIP_CREATED, championship);
    }
    
}