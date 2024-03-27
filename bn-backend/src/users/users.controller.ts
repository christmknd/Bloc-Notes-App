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

  @ApiOperation({ summary: 'Create a new User' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot be registrated' })
  @Post()
  create(@Body() CreateUserDto: CreateUserDto) {
    try {
      return this.usersService.createUser(CreateUserDto);
    } catch {
      throw new BadRequestException('User cannot be registrated');
    }
  }

  @ApiOperation({ summary: 'Get all Users' })
  @ApiResponse({
    status: 200,
    description: 'Return all Users',
    type: User,
  })
  @ApiNotFoundResponse({ description: 'No Users were found' })
  @Get()
  findAll() {
    try {
      return this.usersService.findAllUser();
    } catch {
      throw new NotFoundException('No Users were found');
    }
  }

  @ApiOperation({ summary: 'Get User by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Return User by ID',
    type: User,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Get(':id')
  findUserById(@Param('id') id: number) {
    try {
      return this.usersService.findUserById(+id);
    } catch {
      throw new NotFoundException('User not found');
    }
  }

  @ApiOperation({ summary: 'Update User by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: User,
  })
  @ApiNotFoundResponse({
    description: 'User not found : User cannot be updated',
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() UpdateUserDto: UpdateUserDto) {
    try {
      return this.usersService.updateUser(+id, UpdateUserDto);
    } catch {
      throw new NotFoundException('User not found : User cannot be updated');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete User by ID' })
  delete(@Param('id') id: number) {
    try {
      return this.usersService.deleteUser(+id);
    } catch {
      throw new NotFoundException('User not found : User cannot be deleted');
    }
  }
}
