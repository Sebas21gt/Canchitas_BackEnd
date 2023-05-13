import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeFieldService } from './typeField.service';
import { TypeFieldController } from './typeField.controller';
import { TypeFieldEntity } from '../domain/model/typeField.entity';
import { TypeFieldRepository } from '../domain/repository/typeField.repository';


@Module({
  imports: [TypeOrmModule.forFeature([TypeFieldEntity, TypeFieldRepository])],
  controllers: [TypeFieldController],
  providers: [TypeFieldService],
  exports: [TypeFieldService],
})
export class TypeFieldModule {}