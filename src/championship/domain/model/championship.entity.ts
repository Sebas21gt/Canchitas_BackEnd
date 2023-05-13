import { BaseTableEntity } from "@app/shared/domain/model/base.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { hash } from 'bcrypt';
import { DisciplineEntity } from "@app/discipline/domain/model/discipline.entity";
import { StatusEnum } from "@app/shared/infraestructure/enums/status.enum";

@Entity('championships', { schema: "canchitas" })
export class ChampionshipEntity extends BaseTableEntity {

  @Column()
  name!: string;

  @Column({ name: 'start_date'})
  startDate!: Date;

  @Column({ name: 'final_date'})
  finalDate!: Date;

  @Column({ default: StatusEnum.Active})
  status!: number;

  @ManyToOne(type => DisciplineEntity, discipline => discipline.championship)
  @JoinColumn({ name: "discipline_id" })
  disciplines: DisciplineEntity[];

  @Column({ name: "discipline_id"})
  disciplineId: number;
}