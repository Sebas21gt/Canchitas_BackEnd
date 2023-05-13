import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusEnum } from 'src/shared/infraestructure/enums/status.enum';
import { MessageResponse } from '@app/shared/domain/model/message.response';
import { MessageEnum } from '@app/shared/infraestructure/enums/message.enum';
import { ScoreRepository } from '../domain/repository/score.repository';
import { ScoreCreateDto } from '../domain/dto/score-create.dto';
import { ScoreUpdateDto } from '../domain/dto/score-update.dto';
import { ScoreDto } from '../domain/dto/score.dto';
import { ProgrammingService } from '@app/programming/infraestructure/programming.service';
import { ScoreEntity } from '../domain/model/score.entity';


@Injectable()
export class ScoreService {
	constructor(@InjectRepository(ScoreRepository)
	private readonly scoreRepository: ScoreRepository,
	private readonly programmingService: ProgrammingService,
  ) {}

		async scoreCreate(scoreCreateDto: ScoreCreateDto): Promise<any> {
			let score = await this.scoreRepository.findOne({
				where: {
					programmingId: scoreCreateDto.programmingId,
					status: StatusEnum.Active
				}
			});
		
			if (score) {
				return new MessageResponse(HttpStatus.OK, MessageEnum.SCORE_EXIST, null);
			}
		
			// Si no se encontró un score en la base de datos, crear uno nuevo
			score = new ScoreEntity();
			score.programmingId = scoreCreateDto.programmingId;
			score.status = StatusEnum.Active;
			score.userCreation = '123';
			score.observations = scoreCreateDto.observations;
			score.scoreTeamOne = scoreCreateDto.scoreTeamOne;
			score.scoreTeamTwo = scoreCreateDto.scoreTeamTwo;
			score.flagTeamOne = scoreCreateDto.flagTeamOne;
			score.flagTeamTwo = scoreCreateDto.flagTeamTwo;
		
			return new MessageResponse(HttpStatus.OK, MessageEnum.SCORE_CREATED, await this.scoreRepository.save(score));
		}
		

	async getScores(): Promise<MessageResponse> {
			
		const scores = await this.scoreRepository.find({
			where: { status: StatusEnum.Active },
		});

		if (scores.length < 1) {
			return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.ENTITY_SELECT_EMPTY, null);
		}
		return new MessageResponse(HttpStatus.OK, MessageEnum.ENTITY_SELECT, scores);
	}
	
	async scoreUpdate(id:number, scoreUpdateDto: ScoreUpdateDto){
		const score = await this.scoreRepository.findOne({
			where: {
				id,
				status: StatusEnum.Active
			}
		});
		if (!score){
			return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.SCORE_NOT_EXIST, null);
		}
		Object.assign(score, scoreUpdateDto);
		await this.scoreRepository.update(id, score);
		return new MessageResponse(HttpStatus.OK, MessageEnum.SCORE_UPDATE, score);;
	}
	
	async scoreDelete(id:number){
		const score = await this.scoreRepository.findOne({
			where: {
				id,
				status: StatusEnum.Active
			}
		});
		if (!score){
			return new MessageResponse(HttpStatus.NOT_FOUND, MessageEnum.SCORE_NOT_EXIST, null);;
		}
		return await this.scoreRepository.update(id, {status:StatusEnum.Deleted});
	}

	async assingScore(scoreDto: ScoreDto){
		const score = await this.scoreRepository.findOne({
			where: {
				programmingId: scoreDto.programmingId,
				status: StatusEnum.Active
			}
		});
		console.log(score);
		if (!score){
			return new MessageResponse(HttpStatus.OK, MessageEnum.SCORE_EXIST, null);
		}
		score.observations = scoreDto.observations;
		score.scoreTeamOne = scoreDto.scoreTeamOne;
		score.scoreTeamTwo = scoreDto.scoreTeamTwo;

		await this.scoreRepository.save(score);
	
		return new MessageResponse(HttpStatus.OK, MessageEnum.SCORE_CREATED, score);
	
	}
}