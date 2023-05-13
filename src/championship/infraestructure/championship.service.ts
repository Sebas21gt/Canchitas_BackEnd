import { ConsoleLogger, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusEnum } from 'src/shared/infraestructure/enums/status.enum';
import { ChampionshipRepository } from '../domain/repository/championship.repository';
import { ChampionshipCreateDto } from '../domain/dto/championship-create.dto';
import { ChampionshipUpdateDto } from '../domain/dto/championship-update.dto';
import { MessageResponse } from '@app/shared/domain/model/message.response';
import { MessageEnum } from '@app/shared/infraestructure/enums/message.enum';
import { SortDto } from '../domain/dto/sort.dto';
import { GroupsRepository } from '@app/groups/domain/repository/groups.repository';
import { TeamService } from '@app/team/infraestructure/team.service';
import { TeamChampionshipEntity } from '@app/team/domain/model/team-championship.entity';
import { getConnection } from 'typeorm';


@Injectable()
export class ChampionshipService {
	constructor(@InjectRepository(ChampionshipRepository)
	private readonly championshipRepository: ChampionshipRepository,
	private readonly groupsRepository: GroupsRepository,
	private readonly teamService: TeamService
  ) { }
  
  async championshipCreate(championshipCreateDto:ChampionshipCreateDto): Promise<any> {
		if(championshipCreateDto.startDate > championshipCreateDto.finalDate){
			return new MessageResponse(HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE, MessageEnum.CHAMPIONSHIP_ERROR_DATE, null);
		}
		const championship = await this.championshipRepository.findOne({
			where: { 
				name: championshipCreateDto.name,
				status: StatusEnum.Active }
		});

		if (championship){
			return new MessageResponse(HttpStatus.OK, MessageEnum.CHAMPIONSHIP_EXIST, null);
		}
		return this.championshipRepository.createChampionship(championshipCreateDto);
  }


  async getChampionships(): Promise<any> {
		
		const championships = await this.championshipRepository.find({
		 	where: { status: StatusEnum.Active },
		});

		if (championships.length < 1) {
			return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.ENTITY_SELECT_EMPTY, null);
		}

		return championships;
	}

	async championshipUpdate(id:number, championshipUpdateDto: ChampionshipUpdateDto){
		const championship = await this.championshipRepository.findOne({
			where: {
				id,
				status: StatusEnum.Active
			}
		});
		if (!championship){
			return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.CHAMPIONSHIP_NOT_EXIST, null);
		}
		Object.assign(championship, championshipUpdateDto);
		await this.championshipRepository.update(id, championship);
		return championship;
	}

	async championshipDelete(id:number){
		const championship = await this.championshipRepository.findOne({
			where: {
				id,
				status: StatusEnum.Active
			}
		});
		if (!championship){
			return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.CHAMPIONSHIP_NOT_EXIST, null);;
		}
		return await this.championshipRepository.update(id, {status:StatusEnum.Deleted});
	}

	async sort(sortDto: SortDto): Promise<MessageResponse>{
		const championship = await this.championshipRepository.findOne({
			where: {
				id: sortDto.championshipId
			}
		});
		if (!championship){
			return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.CHAMPIONSHIP_NOT_EXIST, null);;
		}
		const group = await this.groupsRepository.findOne({
			where: {
				championshipId: sortDto.championshipId
			}
		});
		if (!group){
			return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.CHAMPIONSHIP_NOT_EXIST, null);;
		}

		const groupArray: number[] = new Array(group.group);
		
		for (let i = 0; i < group.group; i++) {
			groupArray[i] = i+1;
		}

		const teams = await this.teamService.getTeamsChampionship(sortDto.championshipId, 0);
		if (teams.statusCode == HttpStatus.NOT_FOUND){
			return teams;
		}

		const teamsArray: number[] = [];
		for (let team of teams.data) {
			teamsArray.push(team.teamId);
		}

		const groupTeamArrayIds: number[] = [];
		for (let team of teams.data) {
			groupTeamArrayIds.push(team.id);
		}

		const sortGroup = await this.sortear(teamsArray, groupArray);
		
		const queryRunner = getConnection().createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			let c = 0;
			for (let i = 1; i <= group.group; i++) {
				const teamGroup = sortGroup[i];
				for (let j = 0; j < teamGroup.length; j++) {
					await queryRunner.manager.update(TeamChampionshipEntity, groupTeamArrayIds[c++], {group: i});
				}
			}

		await queryRunner.commitTransaction();
		} catch (error) {
			console.log("Error: ", error);
			await queryRunner.rollbackTransaction();
			return new MessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, MessageEnum.ENTITY_ERROR_CREATE, null);
		}
		return new MessageResponse(HttpStatus.OK, MessageEnum.CREDENTIALS_OK, sortGroup);
	}

	private barajar(arr) {
    arr = arr.slice();
    var longitud = arr.length;
    while (longitud) {
      var posicion = Math.floor(Math.random() * longitud--);
      [arr[longitud], arr[posicion]] = [arr[posicion], arr[longitud]];
    }
    return arr;
  };

	async sortear(teams: any, groups: any) {
    if (groups.length === 0) return {};
    if (groups.length === 1) return { [groups[0]]: this.barajar(teams) };
    
    var distributeCount = teams.length;

    // Crear el objeto: key es el id del magistrado    
    var possessions = groups.reduce((acc, user) =>
      Object.assign(acc, { [user]: new Set() }), {});
    
    var usersLeft = this.barajar(groups);
    while (usersLeft.length < distributeCount)
      usersLeft = usersLeft.concat(usersLeft);
    usersLeft.length = distributeCount; 
    
    var productsLeft = this.barajar(teams).concat(this.barajar(teams));
		// Asignar teams a Magistrados
    while (usersLeft.length) {
      let product = productsLeft.pop();
      let user = usersLeft.pop();
      if (possessions[user].has(product)) { 
        if (usersLeft.length) {           
          [user, usersLeft[usersLeft.length - 1]] =
            [usersLeft[usersLeft.length - 1], user];
        } else {          
          do {
            product = productsLeft.pop();
            if (!product) throw "NO se encuentra Caso para magistrado";
          } while (possessions[user].has(product));
        }
      }
      possessions[user].add(product);
    }
    
    for (let user in possessions) possessions[user] = [...possessions[user]];
    return possessions;
  }
}