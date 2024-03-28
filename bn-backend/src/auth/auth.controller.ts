import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ description: 'User registered succesfully !' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    try {
      return this.authService.register(createUserDto);
      return console.log('User registered succesfully !');
    } catch {
      throw new BadRequestException('Bad Reqquest : User registration failed');
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiResponse({ status: 200, description: 'Successfully logged in' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  login(@Request() req) {
    try {
      const { user } = req;
      return this.authService.login(user);
    } catch {
      throw new UnauthorizedException('Incorrect or Invalid credentials');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiResponse({
    status: 200,
    description: 'Access to our profile page granted',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getUserProfile(@Request() req) {
    try {
      return req.user;
    } catch {
      throw new UnauthorizedException(
        'You are not authorized to go on this page',
      );
    }
  }
}
