import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

export class BaseTableEntity extends BaseEntity{

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'user_creation'})
  userCreation!: string;

  @Column({ name: 'user_update'})
  userUpdate?: string;

  @CreateDateColumn({ name: 'date_creation', default: new Date()})
  dateCreation!: Timestamp;

  @UpdateDateColumn({ name: 'date_update'})
  dateUpdate?: Timestamp;
}