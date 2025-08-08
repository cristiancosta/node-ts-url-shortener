import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('urls')
export class Url {
  @PrimaryGeneratedColumn({
    type: 'int'
  })
  id!: number;

  @Column({
    unique: true,
    type: 'varchar',
    nullable: false
  })
  long_url!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
