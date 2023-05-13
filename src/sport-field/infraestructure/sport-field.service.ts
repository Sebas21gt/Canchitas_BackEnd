import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusEnum } from 'src/shared/infraestructure/enums/status.enum';
import { SportFieldCreateDto } from '../domain/dto/sport-field-create.dto';
import { SportFieldUpdateDto } from '../domain/dto/sport-field-update.dto';
import { SportFieldRepository } from '../domain/repository/sport-field.repository';


@Injectable()
export class SportFieldService {
	constructor(@InjectRepository(SportFieldRepository)
	private readonly sportFieldRepository: SportFieldRepository,	
  	) {}
  
  	async sportFieldCreate(sportFieldCreateDto: SportFieldCreateDto): Promise<any> {
		const team = await this.sportFieldRepository.findOne({
			where: {status: StatusEnum.Active },
		});
	
		if (team){
			return 'La cancha ya existe';
		}
	
		return this.sportFieldRepository.createSportField(sportFieldCreateDto);
	
	}
	
	
	async getSportsFields(): Promise<any> {
			
		const teams = await this.sportFieldRepository.find({
			where: { status: StatusEnum.Active },
		});
	
			/*if (players.length < 1) {
				return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.ENTITY_SELECT_EMPTY, null);
			}*/
	
		return teams;
	}
	
	async sportFieldUpdate(id:number, sportFieldUpdateDto: SportFieldUpdateDto){
		const field = await this.sportFieldRepository.findOne({
			where: {
				id,
				status: StatusEnum.Active
			}
		});
		if (!field){
			return 'La cancha no existe';
		}
		Object.assign(field, sportFieldUpdateDto);
		await this.sportFieldRepository.update(id, field);
		return field;
	}
	
	async sportFieldDelete(id:number){
		const field = await this.sportFieldRepository.findOne({
			where: {
				id,
				status: StatusEnum.Active
			}
		});
		if (!field){
			return 'La cancha no existe';
		}
		return await this.sportFieldRepository.update(id, {status:StatusEnum.Deleted});
	}
}