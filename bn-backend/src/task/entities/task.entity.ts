import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../enums/status-enum';
import { Todolist } from '../../todolist/entities/todolist.entity';

@Entity({ name: 'Task' })
export class Task {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', nullable: false, default: 'Title' })
  @ApiProperty({
    description: 'Title of the task',
    default: 'Title',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(55)
  title: string;

  @Column({ type: 'enum', enum: Status })
  @ApiProperty({
    description: 'Status of the Task',
  })
  @IsEnum(Status)
  status: Status;

  @Column({ type: 'date' })
  @ApiProperty({
    description: 'End Date of the Task',
  })
  @IsDate()
  dueDate: Date;

  @ManyToOne(() => Todolist, (todolist) => todolist.tasks)
  todolist: Todolist;
}
