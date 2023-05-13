import { BaseTableEntity } from "@app/shared/domain/model/base.entity";
import { TeamEntity } from "@app/team/domain/model/team.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('players', { schema: "canchitas" })
export class PlayerEntity extends BaseTableEntity {

  @Column({ name: 'first_name'})
  firstName!: string;

  @Column({ name: 'last_name'})
  lastName!: string;

  @Column()
  ci!: number;

  @Column({ name: 'birth_date'})
  birthDate!: Date;

  @Column()
  photography!: string;

  @Column({ default: true})
  status!: number;

  //Relacion de Muchos a Uno con la tabla Team
  @ManyToOne(type => TeamEntity, team => team.player)
  @JoinColumn({ name: "team_id" })
  team: TeamEntity;

  @Column({ name: "team_id"})
  teamId: number;
}