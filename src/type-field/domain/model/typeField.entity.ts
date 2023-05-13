import { BaseTableEntity } from "@app/shared/domain/model/base.entity";
import { Column, Entity } from "typeorm";

@Entity('types_fields', { schema: "canchitas" })
export class TypeFieldEntity extends BaseTableEntity {

  @Column()
  name!: string;

  @Column()
  status!: number;
}