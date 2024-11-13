import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ nullable: false })
  age: number;

  @Column({ nullable: false })
  gender: boolean;

  @Column({ nullable: false })
  problems: boolean;

}