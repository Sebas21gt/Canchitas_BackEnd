import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusEnum } from 'src/shared/infraestructure/enums/status.enum';
import { PlayerCreateDto } from '../domain/dto/player-create.dto';
import { PlayerUpdateDto } from '../domain/dto/player-update.dto';
import { PlayerRepository } from '../domain/repository/player.repository';
import { TeamRepository } from '@app/team/domain/repository/team.repository';
import { MessageResponse } from '@app/shared/domain/model/message.response';
import { MessageEnum } from '@app/shared/infraestructure/enums/message.enum';


@Injectable()
export class PlayerService {
	constructor(@InjectRepository(PlayerRepository)
	private readonly playerRepository: PlayerRepository
  	) {}
  
  	async playerCreate(playerCreateDto:PlayerCreateDto): Promise<MessageResponse> {
		const player = await this.playerRepository.findOne({
			where: {
				ci: playerCreateDto.ci,
				status: StatusEnum.Active 
			},
		});
	
		if (player){
			return new MessageResponse(HttpStatus.FOUND, MessageEnum.PLAYER_EXIST, null);
		}
		return await this.playerRepository.createPlayer(playerCreateDto);
	}
	
	async getPlayers(): Promise<MessageResponse> {
		const players = await this.playerRepository.find({
			where: { status: StatusEnum.Active },
			relations: ['team'],
		});
		
		if (players.length < 1) {
			return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.ENTITY_SELECT_EMPTY, null);
		}
	
		return new MessageResponse(HttpStatus.OK, MessageEnum.PLAYER_CREATED, players);
	}
	


	async playerUpdate(id:number, playerUpdateDto: PlayerUpdateDto){
		const player = await this.playerRepository.findOne({
			where: {
				id,
				status: StatusEnum.Active
			}
		});
		if (!player){
			return new MessageResponse(HttpStatus.OK, MessageEnum.PLAYER_NOT_EXIST, null);
		}
		Object.assign(player, playerUpdateDto);
		await this.playerRepository.update(id, player);
		return player;
	}
	
		async playerDelete(id:number){
			const player = await this.playerRepository.findOne({
				where: {
					id,
					status: StatusEnum.Active
				}
			});
			if (!player){
				return new MessageResponse(HttpStatus.OK, MessageEnum.PLAYER_NOT_EXIST, null);
			}
			return await this.playerRepository.update(id, {status:StatusEnum.Deleted});
		}
}