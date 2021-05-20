import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from './../auth.service';
import { User } from '../../users/user.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
   constructor(private readonly authService: AuthService) {
      super({ usernameField: 'email' });
   }

   // this should be an async function if we were working with a database
   validate(email: string, password: string): User {
      const user = this.authService.validate(email, password);

      if (!user) {
         throw new UnauthorizedException();
      }

      return user;
   }
}
