import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisciplineService } from './discipline.service';
import { DisciplineController } from './discipline.controller';
import { DisciplineEntity } from '../domain/model/discipline.entity';
import { DisciplineRepository } from '../domain/repository/discipline.repository';


@Module({
  imports: [TypeOrmModule.forFeature([DisciplineEntity,  DisciplineRepository])],
  controllers: [DisciplineController],
  providers: [DisciplineService],
  exports: [DisciplineService],
})
export class DisciplineModule {}