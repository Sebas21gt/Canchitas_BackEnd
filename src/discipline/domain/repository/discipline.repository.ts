import { StatusEnum } from "@app/shared/infraestructure/enums/status.enum";
import { EntityRepository, Repository } from "typeorm";
import { DisciplineEntity } from "../model/discipline.entity";


@EntityRepository(DisciplineEntity)
export class DisciplineRepository extends Repository<DisciplineEntity> {
    
}