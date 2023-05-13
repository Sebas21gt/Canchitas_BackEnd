import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { ScoreEntity } from '../domain/model/score.entity';
import { ScoreRepository } from '../domain/repository/score.repository';
import { ProgrammingService } from '@app/programming/infraestructure/programming.service';
import { ProgrammingRepository } from '@app/programming/domain/repository/programming.repository';
import { TeamService } from '@app/team/infraestructure/team.service';
import { TeamRepository } from '@app/team/domain/repository/team.repository';
import { TeamChampionshipRepository } from '@app/team/domain/repository/team-championship.repository';
import { GroupsRepository } from '@app/groups/domain/repository/groups.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    ScoreEntity,  
    ScoreRepository, 
    ProgrammingRepository, 
    TeamRepository,
    TeamChampionshipRepository,
    GroupsRepository])],
  controllers: [ScoreController],
  providers: [ScoreService, ProgrammingService, TeamService],
  exports: [ScoreService],
})
export class ScoreModule {}