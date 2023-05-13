import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SportFieldService } from './sport-field.service';
import { SportFieldCreateDto } from '../domain/dto/sport-field-create.dto';
import { SportFieldUpdateDto } from '../domain/dto/sport-field-update.dto';



@Controller('/sportField')
export class SportFieldController {
  constructor(private readonly sportFieldService: SportFieldService) {}

  @Post()
  async sportFieldCreate(@Body() sportFieldCreateDto:SportFieldCreateDto): Promise<any> {
    return await this.sportFieldService.sportFieldCreate(sportFieldCreateDto);
  }

  @Put('/:id')
  sportFieldUpdate(@Param('id') id:number, @Body() sportFieldUpdateDto: SportFieldUpdateDto): any {
    return this.sportFieldService.sportFieldUpdate(id, sportFieldUpdateDto);
  }

  @Get()
  async getSportsFields(): Promise <any> {
    return await this.sportFieldService.getSportsFields();
  }

  @Delete('/:id')
  sportFieldDelete(@Param('id') id:number): any {
    return this.sportFieldService.sportFieldDelete(id);
  }
}