import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from '../domain/model/player.entity';
import { PlayerRepository } from '../domain/repository/player.repository';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';


@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity,  PlayerRepository])],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}