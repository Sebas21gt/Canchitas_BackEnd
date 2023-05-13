import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupsRepository } from '../domain/repository/groups.repository';
import { GroupsCreateDto } from '../domain/dto/groups-create.dto';
import { MessageResponse } from '@app/shared/domain/model/message.response';
import { MessageEnum } from '@app/shared/infraestructure/enums/message.enum';


@Injectable()
export class GroupsService {
	constructor(@InjectRepository(GroupsRepository)
	private readonly groupsRepository: GroupsRepository,	
  ) { }
  
  async groupsCreate(groupsCreateDto:GroupsCreateDto): Promise<any> {
		const groups = await this.groupsRepository.findOne({
			where: { 
				championshipId: groupsCreateDto.championshipId
			}
		});

		if (groups){
			return new MessageResponse(HttpStatus.OK, MessageEnum.CHAMPIONSHIP_EXIST, null);
		}
		return this.groupsRepository.createGroups(groupsCreateDto);
  }
}