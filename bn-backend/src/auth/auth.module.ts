import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersService} from "../users/users.service";
import {User} from "../users/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService , UsersService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
