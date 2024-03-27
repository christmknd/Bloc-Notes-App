import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByUsername(username);

    if (user) {
      const matchingPassword = await bcrypt.compare(password, user.password);

      if (matchingPassword) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, username, ...rest } = user;
        return rest;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
      roles: user.roles,
      id: user.id,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 8);
    const newUser = await this.usersService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    if (newUser) {
      const payload = {
        username: newUser.username,
        sub: newUser.id,
        roles: newUser.roles,
      };
      const accessToken = this.generateJwtToken(payload);
      return {
        user: newUser,
        access_token: accessToken,
        username: newUser.username,
      };
    }

    return null;
  }

  generateJwtToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };
    return this.jwtService.sign(payload);
  }
}
