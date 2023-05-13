import { StatusEnum } from "@app/shared/infraestructure/enums/status.enum";
import { EntityRepository, Repository } from "typeorm";
import { GroupsEntity } from "../model/groups.entity";
import { GroupsCreateDto } from "../dto/groups-create.dto";
import { MessageResponse } from "@app/shared/domain/model/message.response";
import { HttpStatus } from "@nestjs/common";
import { MessageEnum } from "@app/shared/infraestructure/enums/message.enum";

@EntityRepository(GroupsEntity)
export class GroupsRepository extends Repository<GroupsEntity> {
    
    async createGroups(groupsDto: GroupsCreateDto): Promise<any> {
      const groups = new GroupsEntity();
      Object.assign(groups, groupsDto);
      console.log(groups);   
      try {
        groups.userCreation = '123';
        await groups.save();
      } catch (e) {
        console.log(e);
        return new MessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, MessageEnum.ENTITY_ERROR_CREATE, null);
      }
      return new MessageResponse(HttpStatus.OK, MessageEnum.CHAMPIONSHIP_CREATED, groups);
    }
    
}