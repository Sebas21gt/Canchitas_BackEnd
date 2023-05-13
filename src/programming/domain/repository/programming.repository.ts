import { StatusEnum } from "@app/shared/infraestructure/enums/status.enum";
import { EntityRepository, Repository } from "typeorm";
import { MessageResponse } from "@app/shared/domain/model/message.response";
import { MessageEnum } from "@app/shared/infraestructure/enums/message.enum";
import { HttpStatus } from "@nestjs/common";
import { ProgrammingEntity } from "../model/programming.entity";
import { ProgrammingCreateDto } from "../dto/programming-create.dto";

@EntityRepository(ProgrammingEntity)
export class ProgrammingRepository extends Repository<ProgrammingEntity> {
    
  async createProgramming(programmingDto: ProgrammingCreateDto): Promise<any> {
    const programming = new ProgrammingEntity();
    Object.assign(programming, programmingDto);
          
    try {
      programming.status = StatusEnum.Active;
      programming.userCreation = '123';
      await programming.save();
    } catch (e) {
      console.log(e);
      return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.ENTITY_ERROR_CREATE, null);;
    }
  }
}