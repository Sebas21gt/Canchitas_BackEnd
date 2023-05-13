import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusEnum } from 'src/shared/infraestructure/enums/status.enum';
import { DisciplineRepository } from '../domain/repository/discipline.repository';
import { In } from 'typeorm';
import { MessageResponse } from '@app/shared/domain/model/message.response';
import { MessageEnum } from '@app/shared/infraestructure/enums/message.enum';


@Injectable()
export class DisciplineService {
	constructor(@InjectRepository(DisciplineRepository)
	private readonly disciplineRepository: DisciplineRepository,	
  	) {}

	async getDisciplines(): Promise<MessageResponse> {
		const disciplines = await this.disciplineRepository.find({
			where: { status: StatusEnum.Active },
		});

		return new MessageResponse(200, MessageEnum.ENTITY_SELECT, disciplines);
	}

	async getDiscipline(id:number): Promise<any> {
		const discipline = await this.disciplineRepository.findOne({
			where: {
				id,
				status: StatusEnum.Active 
			},
		});
		return discipline;
	}

	async getDisciplins(ids:number[]): Promise<MessageResponse> {
		const disciplines = await this.disciplineRepository.find({
			where: {
				id: In(ids),
				status: StatusEnum.Active 
			},
		});
		return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, disciplines);
	}
}