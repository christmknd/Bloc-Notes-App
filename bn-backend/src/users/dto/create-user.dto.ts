import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username',
  })
  @IsString()
  @MinLength(6)
  username: string;

  @ApiProperty({
    description: 'User email',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'user password',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
