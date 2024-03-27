import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Task } from './entities/task.entity';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    type: Task,
  })
  @ApiBadRequestResponse({ description: 'Task cannot be registrated' })
  @Post()
  create(@Body() CreateTaskDto: CreateTaskDto) {
    try {
      return this.taskService.createTask(CreateTaskDto);
    } catch {
      throw new BadRequestException('Task cannot be registrated');
    }
  }

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'Return all tasks',
    type: Task,
  })
  @ApiNotFoundResponse({ description: 'No tasks were found' })
  @Get()
  findAll() {
    try {
      return this.taskService.findAllTasks();
    } catch {
      throw new NotFoundException('No tasks were found');
    }
  }

  @ApiOperation({ summary: 'Get task by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Return task by ID',
    type: Task,
  })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @Get(':id')
  findTaskById(@Param('id') id: number) {
    try {
      return this.taskService.findTaskById(+id);
    } catch {
      throw new NotFoundException('Task not found');
    }
  }

  @ApiOperation({ summary: 'Update task by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
    type: Task,
  })
  @ApiNotFoundResponse({
    description: 'Task not found : Task cannot be updated',
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      return this.taskService.updateTask(+id, updateTaskDto);
    } catch {
      throw new NotFoundException('Task not found : Task cannot be updated');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task by ID' })
  delete(@Param('id') id: number) {
    try {
      return this.taskService.deleteTask(+id);
    } catch {
      throw new NotFoundException('Task not found : Task cannot be deleted');
    }
  }
}
