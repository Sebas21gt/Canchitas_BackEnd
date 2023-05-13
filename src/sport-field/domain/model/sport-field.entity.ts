import { BaseTableEntity } from "@app/shared/domain/model/base.entity";
import { Column, Entity } from "typeorm";

@Entity('sports_fields', { schema: "canchitas" })
export class SportFieldEntity extends BaseTableEntity {

  @Column()
  name!: string;

  @Column()
  direction!: string;

  @Column()
  status!: number;

}