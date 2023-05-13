import { ChampionshipEntity } from "@app/championship/domain/model/championship.entity";
import { BaseTableEntity } from "@app/shared/domain/model/base.entity";
import { StatusEnum } from "@app/shared/infraestructure/enums/status.enum";
import { TeamEntity } from "@app/team/domain/model/team.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";

@Entity('disciplines', { schema: "canchitas" })
export class DisciplineEntity extends BaseTableEntity {
  
  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({default: StatusEnum.Active})
  status!: number;
  
  @ManyToMany(type => TeamEntity, team => team.disciplines)
  teams: TeamEntity[];

  @OneToMany(type => ChampionshipEntity, championship => championship.disciplines)
  championship: ChampionshipEntity;

}