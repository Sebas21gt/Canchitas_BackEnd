import { BaseTableEntity } from "@app/shared/domain/model/base.entity";
import { Column, Entity } from "typeorm";

@Entity('groups', { schema: "canchitas" })
export class GroupsEntity extends BaseTableEntity {

  @Column({ name: "championship_id"})
  championshipId: number;

  @Column()
  group!: number;
}