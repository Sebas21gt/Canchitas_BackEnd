import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsEntity } from '../domain/model/groups.entity';
import { GroupsRepository } from '../domain/repository/groups.repository';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';


@Module({
  imports: [TypeOrmModule.forFeature([GroupsEntity, GroupsRepository])],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}