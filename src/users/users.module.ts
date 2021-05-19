import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
   // no imports in this case
   // imports: []
   controllers: [UsersController],
   providers: [UsersService],
   exports: [UsersService],
})
export class UsersModule {}
