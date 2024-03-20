import {Column, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {IsDate, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";
import {Status} from "../enums/status-enum";

export class CreateTaskDto {
    @ApiProperty({
        description: 'Title of the task',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(55)
    title: string;

    @ApiProperty({
        description: 'Status of the Task',
    })
    @IsEnum(Status)
    status: Status;

    @ApiProperty({
        description: 'End Date of the Task',
        default: 2000,
    })
    @IsDate()
    dueDate: Date;
}
