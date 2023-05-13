import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportFieldController } from './sport-field.controller';
import { SportFieldService } from './sport-field.service';
import { SportFieldEntity } from '../domain/model/sport-field.entity';
import { SportFieldRepository } from '../domain/repository/sport-field.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SportFieldEntity,  SportFieldRepository])],
  controllers: [SportFieldController],
  providers: [SportFieldService],
  exports: [SportFieldService],
})
export class SportFieldModule {}