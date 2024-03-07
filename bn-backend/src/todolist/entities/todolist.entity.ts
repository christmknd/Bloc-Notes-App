import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@Entity({ name: 'Todolist' })
export class Todolist {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', nullable: false, default: 'Todolist' })
  @ApiProperty({
    description: 'Title of the todolist',
    default: 'Title',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(55)
  title: string;

  @Column({ type: 'varchar', nullable: false, default: 'Description' })
  @ApiProperty({
    description: 'Description of the todolist',
    default: 'Description',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(110)
  description: string;
}
