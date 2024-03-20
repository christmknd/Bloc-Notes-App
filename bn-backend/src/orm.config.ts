import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Task } from './task/entities/task.entity';
import { Todolist } from './todolist/entities/todolist.entity';
import * as dotenv from 'dotenv';


if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config();
}


const config: TypeOrmModuleOptions = {
  type: 'postgres', //postgres
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Task, Todolist],
  logging: true,
  synchronize: true,
};
export default config;
