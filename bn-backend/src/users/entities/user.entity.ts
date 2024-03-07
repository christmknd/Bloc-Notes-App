import {Column, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import {Todolist} from "../../todolist/entities/todolist.entity";

export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ unique: true, type: 'varchar', length: 255, nullable: false })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Column({ type: 'varchar' })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', nullable: false })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @OneToMany(() => Todolist, (todolist) => todolist.user)
  todoLists: Todolist[];
}
