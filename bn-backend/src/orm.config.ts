import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Task } from './task/entities/task.entity';
import { Todolist } from './todolist/entities/todolist.entity';

const config: TypeOrmModuleOptions = {
  type: 'postgres', //postgres
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Task, Todolist],
  logging: true,
  synchronize: true,
};
export default config;
