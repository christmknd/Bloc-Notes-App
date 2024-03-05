import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TaskModule } from './task/task.module';
import { TodolistModule } from './todolist/todolist.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, TaskModule, TodolistModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
