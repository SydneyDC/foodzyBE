import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
   // you need to link the AppModule to the other modules that make a part of your app, here UsersModule
   imports: [UsersModule, AuthModule],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
