import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todolist } from '../todolist/entities/todolist.entity';
import { Task } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todolist, Task])],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
