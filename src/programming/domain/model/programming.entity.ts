import { BaseTableEntity } from "@app/shared/domain/model/base.entity";
import { Column, Entity} from "typeorm";

@Entity('programming', { schema: "canchitas" })
export class ProgrammingEntity extends BaseTableEntity {

  @Column()
  date: Date;

  @Column({ name: 'status_programming'})
  statusProgramming!: number;

  @Column()
  status!: number;

  @Column({name: "team_one_id"})
  teamOneId!: number;

  @Column({name: "team_two_id"})
  teamTwoId!: number;

  @Column({name: "championship_id"})
  championshipId!: number;

  @Column()
  group!: number;

  @Column({name: "date_number"})
  dateNumber!: number;

  @Column({name: "sport_field_id"})
  sportFieldId!: number;
}