import { Body, Controller, Get, Post, Put, Delete, ValidationPipe} from '@nestjs/common';
import { Param, UsePipes } from '@nestjs/common/decorators';
import { ChampionshipService } from './championship.service';
import { ChampionshipCreateDto } from '../domain/dto/championship-create.dto';
import { ChampionshipUpdateDto } from '../domain/dto/championship-update.dto';
import { SortDto } from '../domain/dto/sort.dto';


@Controller('/championship')
@UsePipes(new ValidationPipe())
export class ChampionshipController {
  constructor(private readonly championshipService: ChampionshipService) {}

  @Post()
  async championshipCreate(@Body() championshipCreateDto: ChampionshipCreateDto): Promise<any> {
    return await this.championshipService.championshipCreate(championshipCreateDto);
  }

  @Put('/:id')
  championshipUpdate(@Param('id') id:number, @Body() championshipUpdateDto: ChampionshipUpdateDto): any {
    return this.championshipService.championshipUpdate(id, championshipUpdateDto);
  }

  @Get()
  async getChampionships(): Promise <any> {
    return await this.championshipService.getChampionships();
  }

  @Delete('/:id')
  championshipDelete(@Param('id') id:number): any {
    return this.championshipService.championshipDelete(id);
  }

  @Post('/sort')
  async sort(@Body() sortDto: SortDto): Promise<any> {
    return await this.championshipService.sort(sortDto);
  }

  @Post('/test')
  async sortear(@Body('teams') teams: any, @Body('groups') groups: any): Promise<any> {
    return await this.championshipService.sortear(teams, groups);
  }
}