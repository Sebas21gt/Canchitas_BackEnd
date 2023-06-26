import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusEnum } from 'src/shared/infraestructure/enums/status.enum';
import { MessageResponse } from '@app/shared/domain/model/message.response';
import { MessageEnum } from '@app/shared/infraestructure/enums/message.enum';
import { ProgrammingRepository } from '../domain/repository/programming.repository';
import { ProgrammingCreateDto } from '../domain/dto/programming-create.dto';
import { ProgrammingUpdateDto } from '../domain/dto/programming-update.dto';
import { Process } from '../application/process';
import { TeamService } from '@app/team/infraestructure/team.service';
import { ProgrammingEntity } from '../domain/model/programming.entity';
import { StatusProgrammingEnum } from '@app/shared/infraestructure/enums/status-programming.enum';
import { getConnection, getRepository } from 'typeorm';
import { ViewProgrammingEntity } from '../domain/model/view-programming.entity';
import { TeamEntity } from '@app/team/domain/model/team.entity';
import { AssingDateTimeDto } from '../domain/dto/assing-date-time.dto';
import { ViewProgrammingDateEntity } from '../domain/model/view-programming-date.entity';



@Injectable()
export class ProgrammingService {
	constructor(@InjectRepository(ProgrammingRepository)
	private readonly programmingRepository: ProgrammingRepository,
	private readonly teamService: TeamService,
  ) {}
	private readonly teamsRepository =  getRepository<TeamEntity>(TeamEntity); 
  private process = new Process();

  	async programmingCreate(programmingCreateDto: ProgrammingCreateDto): Promise<any> {
		const teams = await this.teamService.getTeamsChampionship(
			programmingCreateDto.championshipId, 
			programmingCreateDto.group
		);
	
		if (teams.data.length == 0){
			return new MessageResponse(HttpStatus.OK, MessageEnum.PROGRAMMING_EXIST, null);
		}
				
		const resultProgramming = await this.process.GenerateRoundRobin(teams.data.length);
		let programmingList: ProgrammingEntity[] = [];
		let currentDate = new Date();
		const dateNumber = resultProgramming[resultProgramming.length-1].length - 1;
		for (let i = 0; i <= dateNumber; i++){
			for (let j = 0; j < teams.data.length; j++){
				let programming = new ProgrammingEntity();
				programming.championshipId = programmingCreateDto.championshipId;
				programming.group = programmingCreateDto.group;
				programming.teamOneId = teams.data[j].teamId;
				programming.date = currentDate;
				programming.status = StatusEnum.Active;
				programming.statusProgramming = StatusProgrammingEnum.Programmed;
				programming.userCreation = "123";
				programming.dateNumber = i+1;
				if (resultProgramming[j][i] == -1){
					programming.teamTwoId = null;
				}else{
					programming.teamTwoId = teams.data[resultProgramming[j][i]].teamId;
				}
				if (j < resultProgramming[j][i]){
					programmingList.push(programming);
				}
			}
		}

		const queryRunner = getConnection().createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		const viewProgramming: ViewProgrammingEntity[] = [];
		try {
			await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(ProgrammingEntity)
        .values(programmingList)
        .execute();
				for (const prog of programmingList){
					const viewProg = new ViewProgrammingEntity();
					viewProg.groupName = 'Serie ' + prog.group;
					viewProg.dateNumber = prog.dateNumber;
					const teamOne = await this.teamsRepository.findOne(prog.teamOneId);
					const teamTwo = await this.teamsRepository.findOne(prog.teamTwoId);
					viewProg.teamOneName = teamOne.name;
					viewProg.teamTwoName = teamTwo.name;
					viewProgramming.push(viewProg);
				}

		await queryRunner.commitTransaction();
		} catch (error) {
			console.log("Error: ", error);
			await queryRunner.rollbackTransaction();
			return new MessageResponse(HttpStatus.INTERNAL_SERVER_ERROR, MessageEnum.ENTITY_ERROR_CREATE, null);
		}
	
		return new MessageResponse(HttpStatus.OK, MessageEnum.PROGRAMMING_CREATED, viewProgramming);
		}
	
	
	async getProgrammings(): Promise<MessageResponse> {
		const programmings = await this.programmingRepository.find({
			where: { status: StatusEnum.Active },
		});

		if (programmings.length < 1) {
			return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.ENTITY_SELECT_EMPTY, null);
		}
		return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, programmings);
	}

	async getProgramming(id:number): Promise<any> {
		const programming = await this.programmingRepository.findOne({
			where: {
				id,
				status: StatusEnum.Active 
			},
		});
		return programming;
	}
	
	async programmingUpdate(id:number, programmingUpdateDto: ProgrammingUpdateDto){
		const programming = await this.programmingRepository.findOne({
			where: {
				id,
				status: StatusEnum.Active
			}
		});
		if (!programming){
			return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.PROGRAMMING_NOT_EXIST, null);
		}
		Object.assign(programming, programmingUpdateDto);
		await this.programmingRepository.update(id, programming);
		return new MessageResponse(HttpStatus.OK, MessageEnum.PROGRAMMING_UPDATE, programming);;
	}
	
	async programmingDelete(id:number){
		const programming = await this.programmingRepository.findOne({
			where: {
				id,
				status: StatusEnum.Active
			}
		});
		if (!programming){
			return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.PROGRAMMING_NOT_EXIST, null);;
		}
		return await this.programmingRepository.update(id, {status:StatusEnum.Deleted});
	}

	async getRR(): Promise<MessageResponse> {
		const numTeams = 6;
		const result = this.process.GenerateRoundRobin(numTeams);

		return result;
	}

	async viewProgramming(
		championshipId:number, 
		groupId:number): 
		Promise<MessageResponse> {
			const viewProgramming: ViewProgrammingEntity[] = [];
			const programming = await this.programmingRepository.find({
				where: {
					championshipId,
					group: groupId, 
					status: StatusEnum.Active
				}
		});
		for (const prog of programming){
			const viewProg = new ViewProgrammingEntity();
			viewProg.groupName = 'Serie ' + prog.group;
			viewProg.dateNumber = prog.dateNumber;
			const teamOne = await this.teamsRepository.findOne(prog.teamOneId);
			const teamTwo = await this.teamsRepository.findOne(prog.teamTwoId);
			viewProg.teamOneName = teamOne.name;
			viewProg.teamTwoName = teamTwo.name;
			viewProgramming.push(viewProg);
		}
		if (!programming){
			return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.PROGRAMMING_NOT_EXIST, null);;
		}
		return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, viewProgramming);
	}

	async assingDateTime(assingDateTimeDto: AssingDateTimeDto){
		const programming = await this.programmingRepository.find({
			where: {
				championshipId: assingDateTimeDto.championshipId,
				group: assingDateTimeDto.group, 
				dateNumber: assingDateTimeDto.dateNumber,
				status: StatusEnum.Active
			}
		});
		if (!programming){
			return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.PROGRAMMING_NOT_EXIST, null);
		}
		let dateTime: Date = new Date(assingDateTimeDto.dateNow);
		let i = 0;
		for (const prog of programming){
			prog.date = new Date(dateTime.getTime() + (i*40)*60000);
			i++;
			prog.sportFieldId = assingDateTimeDto.sportFieldId;
			await this.programmingRepository.update(prog.id, prog);
		}
		return new MessageResponse(HttpStatus.OK, MessageEnum.PROGRAMMING_UPDATE, programming);
	}

	async viewProgrammingDate(
		championshipId:number, 
		groupId:number): 
		Promise<MessageResponse> {
		const viewProgrammingDate: ViewProgrammingEntity[] = [];
		const programming = await this.programmingRepository.find({
			where: {
				championshipId,
				group: groupId,
				status: StatusEnum.Active
			}
		});
		let i = 0;
		for (const prog of programming){
			prog.date = new Date(prog.date.getTime() + (i*40)*60000);
			i++;
			const viewProgDate = new ViewProgrammingDateEntity();
			viewProgDate.groupName = 'Serie ' + prog.group;
			viewProgDate.dateNumber = prog.dateNumber;
			const teamOne = await this.teamsRepository.findOne(prog.teamOneId);
			const teamTwo = await this.teamsRepository.findOne(prog.teamTwoId);
			viewProgDate.teamOneName = teamOne.name;
			viewProgDate.teamTwoName = teamTwo.name;
			viewProgDate.date = prog.date.getHours() + ':' + prog.date.getMinutes();
			console.log(prog.date);
			viewProgrammingDate.push(viewProgDate);
		}
		if (!programming){
			return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.PROGRAMMING_NOT_EXIST, null);;
		}
		return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, viewProgrammingDate);
	}
}