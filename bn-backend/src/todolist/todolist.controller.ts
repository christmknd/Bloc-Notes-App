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
import { TodolistService } from './todolist.service';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Todolist } from '../todolist/entities/todolist.entity';

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) {}

  @ApiOperation({ summary: 'Create a new todolist' })
  @ApiBody({ type: CreateTodolistDto })
  @ApiResponse({
    status: 201,
    description: 'Todolist created successfully',
    type: Todolist,
  })
  @ApiBadRequestResponse({ description: 'Todolist cannot be registrated' })
  @Post()
  create(@Body() CreateTodolistDto: CreateTodolistDto) {
    try {
      return this.todolistService.createTodolist(CreateTodolistDto);
    } catch {
      throw new BadRequestException('Todolist cannot be registrated');
    }
  }

  @ApiOperation({ summary: 'Get all todolists' })
  @ApiResponse({
    status: 200,
    description: 'Return all todolists',
    type: Todolist,
  })
  @ApiNotFoundResponse({ description: 'No todolists were found' })
  @Get()
  findAll() {
    try {
      return this.todolistService.findAllTodolists();
    } catch {
      throw new NotFoundException('No todolists were found');
    }
  }

  @ApiOperation({ summary: 'Get todolist by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Return todolist by ID',
    type: Todolist,
  })
  @ApiNotFoundResponse({ description: 'Todolist not found' })
  @Get(':id')
  findTodolistById(@Param('id') id: number) {
    try {
      return this.todolistService.findTodolistById(+id);
    } catch {
      throw new NotFoundException('Todolist not found');
    }
  }

  @ApiOperation({ summary: 'Update todolist by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateTodolistDto })
  @ApiResponse({
    status: 200,
    description: 'Todolist updated successfully',
    type: Todolist,
  })
  @ApiNotFoundResponse({
    description: 'Todolist not found : Todolist cannot be updated',
  })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTodolistDto: UpdateTodolistDto,
  ) {
    try {
      return this.todolistService.updateTodolist(+id, updateTodolistDto);
    } catch {
      throw new NotFoundException(
        'Todolist not found : Todolist cannot be updated',
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete todolist by ID' })
  delete(@Param('id') id: number) {
    try {
      return this.todolistService.deleteTodolist(+id);
    } catch {
      throw new NotFoundException(
        'Todolist not found : Todolist cannot be deleted',
      );
    }
  }
}
