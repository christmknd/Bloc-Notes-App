import { Module } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { TodolistController } from './todolist.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Todolist} from "./entities/todolist.entity";
import {Task} from "../task/entities/task.entity";
import {User} from "../users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Todolist, Task, User])],
  controllers: [TodolistController],
  providers: [TodolistService]
})
export class TodolistModule {}
