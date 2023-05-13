import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusEnum } from 'src/shared/infraestructure/enums/status.enum';
import { TeamRepository } from '../domain/repository/team.repository';
import { TeamCreateDto } from '../domain/dto/team-create.dto';
import { TeamUpdateDto } from '../domain/dto/team-update.dto';
import { MessageResponse } from '@app/shared/domain/model/message.response';
import { MessageEnum } from '@app/shared/infraestructure/enums/message.enum';
import { TeamRegisterDto } from '../domain/dto/team-register.dto';
import { TeamChampionshipRepository } from '../domain/repository/team-championship.repository';
import { GroupsRepository } from '@app/groups/domain/repository/groups.repository';


@Injectable()
export class TeamService {
	constructor(@InjectRepository(TeamRepository)
	private readonly teamRepository: TeamRepository,
	private readonly teamChampionshipRepository: TeamChampionshipRepository,
	private readonly groupsRepository: GroupsRepository
  ) {}
  
  	async teamCreate(teamCreateDto: TeamCreateDto): Promise<any> {
		const team = await this.teamRepository.findOne({
			where: {
				name: teamCreateDto.name,
				status: StatusEnum.Active
			}
		});
	
		if (team){
			return new MessageResponse(HttpStatus.OK, MessageEnum.TEAM_EXIST, null);
		}
		return this.teamRepository.createTeam(teamCreateDto);
	}
	
	async getTeams(): Promise<MessageResponse> {
			
		const teams = await this.teamRepository.find({
			where: { status: StatusEnum.Active },
			// relations: ['disciplines'],
		});

		if (teams.length < 1) {
			return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.ENTITY_SELECT_EMPTY, null);
		}
		return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, teams);
	}
	
	async teamUpdate(id:number, teamUpdateDto: TeamUpdateDto){
		const team = await this.teamRepository.findOne({
			where: {
				id,
				status: StatusEnum.Active
			}
		});
		if (!team){
			return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.TEAM_NOT_EXIST, null);
		}
		Object.assign(team, teamUpdateDto);
		await this.teamRepository.update(id, team);
		return new MessageResponse(HttpStatus.OK, MessageEnum.TEAM_UPDATE, team);;
	}
	
	async teamDelete(id:number){
		const team = await this.teamRepository.findOne({
			where: {
				id,
				status: StatusEnum.Active
			}
		});
		if (!team){
			return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.TEAM_NOT_EXIST, null);;
		}
		return await this.teamRepository.update(id, {status:StatusEnum.Deleted});
	}

	async teamRegister(teamRegisterDto: TeamRegisterDto){
		const team = await this.teamChampionshipRepository.findOne({
			where: {
				teamId: teamRegisterDto.teamId,
			}
		});
	
		if (team){
			return new MessageResponse(HttpStatus.OK, MessageEnum.TEAM_EXIST, null);
		}
		return this.teamChampionshipRepository.registerTeam(teamRegisterDto);
	}

	async getTeamsChampionship(championshipId:number, group: number): Promise<MessageResponse> {
		const teams = await this.teamChampionshipRepository.find({
			where: { 
				championshipId: championshipId,
				group: group
			 },
			//relations: ['teams_championships'],
		});
		if (teams.length < 1) {
			return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.ENTITY_SELECT_EMPTY, null);
		}
		return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, teams);
	}	
}