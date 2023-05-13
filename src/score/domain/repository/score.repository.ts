import { StatusEnum } from "@app/shared/infraestructure/enums/status.enum";
import { EntityRepository, Repository } from "typeorm";
import { MessageResponse } from "@app/shared/domain/model/message.response";
import { MessageEnum } from "@app/shared/infraestructure/enums/message.enum";
import { HttpStatus } from "@nestjs/common";
import { ScoreEntity } from "../model/score.entity";
import { ScoreCreateDto } from "../dto/score-create.dto";


@EntityRepository(ScoreEntity)
export class ScoreRepository extends Repository<ScoreEntity> {
    
  async createScore(scoreDto: ScoreCreateDto): Promise<any> {
    const score = new ScoreEntity();
    Object.assign(score, scoreDto);
          
    try {
      score.status = StatusEnum.Active;
      score.userCreation = '123';
      await score.save();
    } catch (e) {
      console.log(e);
      return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.ENTITY_ERROR_CREATE, null);;
    }
  }  
}