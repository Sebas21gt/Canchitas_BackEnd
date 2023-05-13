import { BaseTableEntity } from "@app/shared/domain/model/base.entity";
import { Column, Entity } from "typeorm";

@Entity('teams_championships', { schema: "canchitas" })
export class TeamChampionshipEntity extends BaseTableEntity {

  @Column({ name: 'team_id'})
  teamId!: number;

  @Column({ name: 'championship_id'})
  championshipId!: number;

  @Column()
  group!: number;
}