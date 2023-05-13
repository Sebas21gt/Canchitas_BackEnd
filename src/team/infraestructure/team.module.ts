import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TeamEntity } from '../domain/model/team.entity';
import { TeamRepository } from '../domain/repository/team.repository';
import { DisciplineService } from '@app/discipline/infraestructure/discipline.service';
import { DisciplineRepository } from '@app/discipline/domain/repository/discipline.repository';
import { TeamChampionshipRepository } from '../domain/repository/team-championship.repository';
import { TeamChampionshipEntity } from '../domain/model/team-championship.entity';
import { GroupsRepository } from '@app/groups/domain/repository/groups.repository';


@Module({
  imports: [TypeOrmModule.forFeature([
    TeamEntity,  
    TeamRepository, 
    DisciplineRepository,
    GroupsRepository,
    TeamChampionshipRepository, 
    TeamChampionshipEntity])],
  controllers: [TeamController],
  providers: [TeamService, DisciplineService],
  exports: [TeamService],
})
export class TeamModule {}