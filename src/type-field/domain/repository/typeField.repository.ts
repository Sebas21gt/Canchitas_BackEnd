import { StatusEnum } from "@app/shared/infraestructure/enums/status.enum";
import { EntityRepository, Repository } from "typeorm";
import { TypeFieldEntity } from "../model/typeField.entity";

@EntityRepository(TypeFieldEntity)
export class TypeFieldRepository extends Repository<TypeFieldEntity> {
    
}