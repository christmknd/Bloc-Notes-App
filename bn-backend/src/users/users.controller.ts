import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Task cannot be registrated' })
  @Post()
  create(@Body() CreateUserDto: CreateUserDto) {
    try {
      return this.usersService.createUser(CreateUserDto);
    } catch {
      throw new BadRequestException('Task cannot be registrated');
    }
  }

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'Return all tasks',
    type: User,
  })
  @ApiNotFoundResponse({ description: 'No tasks were found' })
  @Get()
  findAll() {
    try {
      return this.usersService.findAllUser();
    } catch {
      throw new NotFoundException('No tasks were found');
    }
  }

  @ApiOperation({ summary: 'Get task by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Return task by ID',
    type: User,
  })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @Get(':id')
  findTaskById(@Param('id') id: number) {
    try {
      return this.usersService.findUserById(+id);
    } catch {
      throw new NotFoundException('Task not found');
    }
  }

  @ApiOperation({ summary: 'Update task by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'Task not found : Task cannot be updated',
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() UpdateUserDto: UpdateUserDto) {
    try {
      return this.usersService.updateUser(+id, UpdateUserDto);
    } catch {
      throw new NotFoundException('Task not found : Task cannot be updated');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task by ID' })
  delete(@Param('id') id: number) {
    try {
      return this.usersService.deleteUser(+id);
    } catch {
      throw new NotFoundException('Task not found : Task cannot be deleted');
    }
  }
}
