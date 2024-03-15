import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class CreateTodolistDto {

    @ApiProperty({
        description: 'Title of the todolist'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(55)
    title: string;

    @ApiProperty({
        description: 'Description of the todolist',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(110)
    description: string;
}
