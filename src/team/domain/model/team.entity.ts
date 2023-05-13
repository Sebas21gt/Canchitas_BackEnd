import { DisciplineEntity } from "@app/discipline/domain/model/discipline.entity";
import { PlayerEntity } from "@app/player/domain/model/player.entity";
import { BaseTableEntity } from "@app/shared/domain/model/base.entity";
import { StatusEnum } from "@app/shared/infraestructure/enums/status.enum";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";

@Entity('teams', { schema: "canchitas" })
export class TeamEntity extends BaseTableEntity {

  @OneToMany(type => PlayerEntity, player => player.team)
  player: PlayerEntity[];

  @Column()
  name!: string;

  @Column({ name: 'shield_photography'})
  shieldPhotography!: string;

  @Column({ name: 'delegate_name'})
  delegateName!: string;

  @Column({ default: StatusEnum.Active})
  status!: number;

  @ManyToMany(type => DisciplineEntity)
  @JoinTable({ 
    name: 'teams_disciplines',
    joinColumn: { name: "team_id", referencedColumnName: "id" }, 
    inverseJoinColumn: { name: "discipline_id", referencedColumnName: "id" }
  })
  disciplines: DisciplineEntity[];
}