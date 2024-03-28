import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {IsEmail, IsEnum, IsNotEmpty, IsString, MinLength} from 'class-validator';
import { Todolist } from '../../todolist/entities/todolist.entity';
import {Role} from "../enums/role-num";
import {ApiProperty} from "@nestjs/swagger";


@Entity({ name: 'User' })
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

  @Column({ type: 'enum', enum: Role, default: Role.User })
  @IsEnum(Role)
  roles: Role;


  @OneToMany(() => Todolist, (todolist) => todolist.user , { lazy: true })
  @ApiProperty({ type: () => Todolist })
  todolist: Todolist[];
}
