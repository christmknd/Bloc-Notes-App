import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todolist } from './entities/todolist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodolistService {
  constructor(
    @InjectRepository(Todolist)
    private todolistRepository: Repository<Todolist>,
  ) {}
  async createTodolist(
    CreateTodolistDto: CreateTodolistDto,
  ): Promise<Todolist> {
    const todolist = this.todolistRepository.create(CreateTodolistDto);
    return this.todolistRepository.save(todolist);
  }

  async findAllTodolists(): Promise<Todolist[]> {
    return this.todolistRepository.find();
  }

  async findTodolistById(id: number): Promise<Todolist> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const todolist = await this.todolistRepository.findOneBy({ id: id });
    if (!todolist) {
      throw new NotFoundException(`Todolist with id ${id} not found`);
    }
    return todolist;
  }

  async updateTodolist(
    id: number,
    UpdateTodolistDto: UpdateTodolistDto,
  ): Promise<Todolist> {
    const todolist = await this.todolistRepository.findOneBy({ id: id });
    if (!todolist) {
      throw new NotFoundException(`Todolist with ID ${id} not found`);
    }
    Object.assign(todolist, UpdateTodolistDto);
    return this.todolistRepository.save(todolist);
  }

  async deleteTodolist(id: number): Promise<void> {
    const todolist = await this.todolistRepository.findOneBy({ id: id });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!todolist) {
      throw new NotFoundException(`Todolist with id ${id} not found`);
    }
    await this.todolistRepository.delete(todolist);
  }
}
