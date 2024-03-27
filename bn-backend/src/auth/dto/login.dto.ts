import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'User username',
  })
  @IsString()
  @MinLength(6)
  username: string;

  @ApiProperty({
    description: 'user password',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
