import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgrammingService } from './programming.service';
import { ProgrammingController } from './programming.controller';
import { ProgrammingEntity } from '../domain/model/programming.entity';
import { ProgrammingRepository } from '../domain/repository/programming.repository';
import { TeamService } from '@app/team/infraestructure/team.service';
import { TeamRepository } from '@app/team/domain/repository/team.repository';
import { TeamChampionshipRepository } from '@app/team/domain/repository/team-championship.repository';
import { GroupsRepository } from '@app/groups/domain/repository/groups.repository';
import { ViewProgrammingEntity } from '../domain/model/view-programming.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgrammingEntity,  
    ProgrammingRepository, 
    TeamRepository, 
    TeamChampionshipRepository,
    GroupsRepository,
    ])],
  controllers: [ProgrammingController],
  providers: [ProgrammingService, TeamService],
  exports: [ProgrammingService],
})
export class ProgrammingModule {}