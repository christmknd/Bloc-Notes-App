import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {User} from "./entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Todolist} from "../todolist/entities/todolist.entity";
import {Task} from "../task/entities/task.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Todolist, Task, User])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
