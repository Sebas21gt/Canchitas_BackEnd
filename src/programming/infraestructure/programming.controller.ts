import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProgrammingService } from './programming.service';
import { ProgrammingCreateDto } from '../domain/dto/programming-create.dto';
import { ProgrammingUpdateDto } from '../domain/dto/programming-update.dto';
import { AssingDateTimeDto } from '../domain/dto/assing-date-time.dto';



@Controller('/programming')
export class ProgrammingController {
  constructor(private readonly programmingService: ProgrammingService) {}

  @Post()
  @UsePipes( new ValidationPipe())
  async programmingCreate(@Body() programmingCreateDto: ProgrammingCreateDto): Promise<any> {
    return await this.programmingService.programmingCreate(programmingCreateDto);
  }

  @Put('/:id')
  @UsePipes( new ValidationPipe())
  programmingUpdate(@Param('id') id:number, @Body() programmingUpdateDto: ProgrammingUpdateDto): any {
    return this.programmingService.programmingUpdate(id, programmingUpdateDto);
  }

  @Get()
  async getProgrammings(): Promise <any> {
    return await this.programmingService.getProgrammings();
  }

  @Delete('/:id')
  programmingDelete(@Param('id') id:number): any {
    return this.programmingService.programmingDelete(id);
  }

  @Get('/rr')
  async getRoundRobin(): Promise <any> {
    return await this.programmingService.getRR();
  }

  @Get('/view-programming/:championshipId/:groupId/:dateNumber')
  async viewProgramming(
    @Param('championshipId') championshipId:number, 
    @Param('groupId') groupId:number, 
    @Param('dateNumber') dateNumber:number): Promise<any> {
    return await this.programmingService.viewProgramming(championshipId, groupId, dateNumber);
  }

  @Get('/view-programming-date/:championshipId/:groupId/:dateNumber')
  async viewProgrammingDate(
    @Param('championshipId') championshipId:number, 
    @Param('groupId') groupId:number, 
    @Param('dateNumber') dateNumber:number): Promise<any> {
    return await this.programmingService.viewProgrammingDate(championshipId, groupId, dateNumber);
  }

  @Post('/assing-date')
  async assingDateTime(@Body() assingDateTimeDto: AssingDateTimeDto): Promise<any> {
    return  this.programmingService.assingDateTime(assingDateTimeDto);
  }

  @Get('/:id')
  async getProgramming(@Param('id') id:number): Promise <any> {
    return await this.programmingService.getProgramming(id);
  }
}