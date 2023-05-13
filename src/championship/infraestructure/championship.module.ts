import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChampionshipController } from './championship.controller';
import { ChampionshipService } from './championship.service';
import { ChampionshipEntity } from '../domain/model/championship.entity';
import { ChampionshipRepository } from '../domain/repository/championship.repository';
import { GroupsRepository } from '@app/groups/domain/repository/groups.repository';
import { TeamService } from '@app/team/infraestructure/team.service';
import { TeamRepository } from '@app/team/domain/repository/team.repository';
import { TeamChampionshipRepository } from '@app/team/domain/repository/team-championship.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    ChampionshipEntity, 
    ChampionshipRepository, 
    GroupsRepository,
    TeamRepository,
    TeamChampionshipRepository])],
  controllers: [ChampionshipController],
  providers: [ChampionshipService, TeamService],
  exports: [ChampionshipService],
})
export class ChampionshipModule {}