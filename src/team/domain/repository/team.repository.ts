import { StatusEnum } from "@app/shared/infraestructure/enums/status.enum";
import { EntityRepository, Repository } from "typeorm";
import { TeamEntity } from "../model/team.entity";
import { TeamCreateDto } from "../dto/team-create.dto";
import { HttpStatus } from "@nestjs/common";
import { MessageEnum } from "@app/shared/infraestructure/enums/message.enum";
import { MessageResponse } from "@app/shared/domain/model/message.response";


@EntityRepository(TeamEntity)
export class TeamRepository extends Repository<TeamEntity> {
    
    async createTeam(teamDto: TeamCreateDto): Promise<any> {
    
        const team = new TeamEntity();
        Object.assign(team, teamDto);
          
        try {
          team.userCreation = '123';
          await team.save();
        } catch (e) {
          console.log(e);
          return new MessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, MessageEnum.ENTITY_ERROR_CREATE, null);;
        }
        return new MessageResponse(HttpStatus.OK, MessageEnum.TEAM_CREATED, team);
    }
}