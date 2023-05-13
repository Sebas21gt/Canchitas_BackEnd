import { BaseTableEntity } from "@app/shared/domain/model/base.entity";
import { BeforeInsert, Column, Entity } from "typeorm";
import { hash } from 'bcrypt';

@Entity('users', { schema: "canchitas" })
export class UserEntity extends BaseTableEntity {

  @Column({ name: 'first_name'})
  firstName!: string;

  @Column({ name: 'last_name'})
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;	

  @Column()
  status!: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, parseInt(process.env.ROUNDS_SECURITY));
  }
}