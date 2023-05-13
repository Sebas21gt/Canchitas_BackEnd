import { BaseTableEntity } from "@app/shared/domain/model/base.entity";
import { StatusEnum } from "@app/shared/infraestructure/enums/status.enum";
import { Column, Entity} from "typeorm";

@Entity('scores', { schema: "canchitas" })
export class ScoreEntity extends BaseTableEntity {

  @Column()
  observations!: string;

  @Column({ name: 'score_team_one'})
  scoreTeamOne!: number;

  @Column({ name: 'score_team_two'})
  scoreTeamTwo!: number;

  @Column({ name: 'flag_team_one'})
  flagTeamOne: boolean;

  @Column({ name: 'flag_team_two'})
  flagTeamTwo: boolean;

  @Column({default: StatusEnum.Active })
  status: number;

  @Column({name: "programming_id"})
  programmingId!: number;

  //Programming_ID
  //Relacion con Programacion
}