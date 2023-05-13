import { Body, Controller, Get, Post, Put, Delete, ValidationPipe} from '@nestjs/common';
import { Param, UsePipes } from '@nestjs/common/decorators';
import { GroupsService } from './groups.service';
import { GroupsCreateDto } from '../domain/dto/groups-create.dto';


@Controller('/groups')
@UsePipes(new ValidationPipe())
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  async groupsCreate(@Body() groupsCreateDto: GroupsCreateDto): Promise<any> {
    return await this.groupsService.groupsCreate(groupsCreateDto);
  }
}