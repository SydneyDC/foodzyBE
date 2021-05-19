import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { jwtSecret } from './constants';
import { UsersModule } from './../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
   imports: [
      UsersModule,
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({ secret: jwtSecret, signOptions: { expiresIn: '3600s' } }),
   ],
   controllers: [AuthController],
   providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
