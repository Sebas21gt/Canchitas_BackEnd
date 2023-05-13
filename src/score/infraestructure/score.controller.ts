import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { DisciplineService } from '@app/discipline/infraestructure/discipline.service';
import { MessageEnum } from '@app/shared/infraestructure/enums/message.enum';
import { MessageResponse } from '@app/shared/domain/model/message.response';
import { ScoreService } from './score.service';
import { ScoreCreateDto } from '../domain/dto/score-create.dto';
import { ScoreUpdateDto } from '../domain/dto/score-update.dto';
import { ScoreDto } from '../domain/dto/score.dto';



@Controller('/score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  @UsePipes( new ValidationPipe())
  async scoreCreate(@Body() scoreCreateDto: ScoreCreateDto): Promise<any> {
    return await this.scoreService.scoreCreate(scoreCreateDto);
  }

  @Put('/:id')
  @UsePipes( new ValidationPipe())
  scoreUpdate(@Param('id') id:number, @Body() scoreUpdateDto: ScoreUpdateDto): any {
    return this.scoreService.scoreUpdate(id, scoreUpdateDto);
  }

  @Get()
  async getScores(): Promise <any> {
    return await this.scoreService.getScores();
  }

  @Delete('/:id')
  scoreDelete(@Param('id') id:number): any {
    return this.scoreService.scoreDelete(id);
  }

  @Post('/score-assing')
  async assingScore(@Body() scoreDto: ScoreDto): Promise<any> {
    return await this.scoreService.assingScore(scoreDto);
  }
}