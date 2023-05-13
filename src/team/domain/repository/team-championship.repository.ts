import { StatusEnum } from "@app/shared/infraestructure/enums/status.enum";
import { EntityRepository, Repository } from "typeorm";
import { TeamEntity } from "../model/team.entity";
import { TeamCreateDto } from "../dto/team-create.dto";
import { HttpStatus } from "@nestjs/common";
import { MessageEnum } from "@app/shared/infraestructure/enums/message.enum";
import { MessageResponse } from "@app/shared/domain/model/message.response";
import { TeamRegisterDto } from "../dto/team-register.dto";
import { TeamChampionshipEntity } from "../model/team-championship.entity";


@EntityRepository(TeamChampionshipEntity)
export class TeamChampionshipRepository extends Repository<TeamChampionshipEntity> {
    
  async registerTeam(teamRegisterDto: TeamRegisterDto): Promise<any>{
    const team = new TeamChampionshipEntity();
    Object.assign(team, teamRegisterDto);
    try {
      team.userCreation = '123';
      await team.save();
    } catch (e) {
      console.log(e);
      return new MessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, MessageEnum.ENTITY_ERROR_CREATE, null);;
    }
    return new MessageResponse(HttpStatus.OK, MessageEnum.TEAM_REGISTER, team);
  }
}