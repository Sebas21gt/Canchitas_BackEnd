import { Controller, Get, Param } from '@nestjs/common';
import { DisciplineService } from './discipline.service';
import { MessageResponse } from '@app/shared/domain/model/message.response';


@Controller('/discipline')
export class DisciplineController {
  constructor(private readonly disciplineService: DisciplineService) {}

  @Get()
  async getDisciplines(): Promise <MessageResponse> {
    return await this.disciplineService.getDisciplines();
  }

  @Get('/:id')
  async getDiscipline(@Param('id') id:number): Promise <any> {
    return await this.disciplineService.getDiscipline(id);
  }

}