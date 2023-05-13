import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamCreateDto } from '../domain/dto/team-create.dto';
import { TeamUpdateDto } from '../domain/dto/team-update.dto';
import { DisciplineService } from '@app/discipline/infraestructure/discipline.service';
import { MessageEnum } from '@app/shared/infraestructure/enums/message.enum';
import { MessageResponse } from '@app/shared/domain/model/message.response';
import { TeamRegisterDto } from '../domain/dto/team-register.dto';



@Controller('/team')
export class TeamController {
  constructor(private readonly teamService: TeamService,
    private readonly disciplineService: DisciplineService) {}

  @Post()
  @UsePipes( new ValidationPipe())
  async teamCreate(@Body() teamCreateDto:TeamCreateDto): Promise<any> {
    if(teamCreateDto.disciplines.length == 0){
      return new MessageResponse(HttpStatus.OK, MessageEnum.DISCIPLINES_NOT_EXIST, []);
    }
    const ids: number[] = [];
    for (const discipline of teamCreateDto.disciplines){
      ids.push(discipline);
    }
    const disciplines = await this.disciplineService.getDisciplins(ids);
      if (disciplines.data.length != teamCreateDto.disciplines.length){
      return new MessageResponse(HttpStatus.OK, MessageEnum.DISCIPLINES_NOT_EXIST, []);
    }
    return await this.teamService.teamCreate(teamCreateDto);
  }

  @Put('/:id')
  @UsePipes( new ValidationPipe())
  teamUpdate(@Param('id') id:number, @Body() teamUpdateDto: TeamUpdateDto): any {
    return this.teamService.teamUpdate(id, teamUpdateDto);
  }

  @Get()
  async getTeams(): Promise <any> {
    return await this.teamService.getTeams();
  }

  @Delete('/:id')
  teamDelete(@Param('id') id:number): any {
    return this.teamService.teamDelete(id);
  }

  @Post('/register')
  async teamRegister(@Body() teamRegisterDto:TeamRegisterDto): Promise<any>{
    return await this.teamService.teamRegister(teamRegisterDto);
  }

  // @Get('/:championshipId')
  // async getTeamsChampionship(@Param('championshipId') championshipId:number): Promise <any> {
  //   return await this.teamService.getTeamsChampionship(championshipId);
  // }  
}