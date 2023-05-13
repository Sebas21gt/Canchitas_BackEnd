import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusEnum } from 'src/shared/infraestructure/enums/status.enum';
import { TypeFieldRepository } from '../domain/repository/typeField.repository';


@Injectable()
export class TypeFieldService {
	constructor(@InjectRepository(TypeFieldRepository)
	private readonly typeFieldRepository: TypeFieldRepository,	
  ) { }

  	async getTypesFields(): Promise<any> {
		
		const typesFields = await this.typeFieldRepository.find({
		 	where: { status: StatusEnum.Active },
		});

		/*if (users.length < 1) {
			return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.ENTITY_SELECT_EMPTY, null);
		}*/

		return typesFields;
	}
}