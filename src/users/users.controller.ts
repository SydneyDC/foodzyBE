import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
   constructor(private usersService: UsersService) {}

   @Post()
   addUser(
      //@Body () completeBody: {firstName: string, lastName: string, email: string}
      @Body('firstName') userFirstName: string,
      @Body('lastName') userLastName: string,
      @Body('email') userEmail: string,
      @Body('password') userPassword: string,
   ) {
      // we are able not to specify any type here thanks to typescript capacity to infer type
      // remember if you don't manage this data with a database, it will refresh the values after each code update
      // in this case for example our list of users create by our post method would go back to an empty array
      const generatedId = this.usersService.insertUser(
         userFirstName,
         userLastName,
         userEmail,
         userPassword,
      );
      return { id: generatedId };
   }

   @Get()
   getAllUsers() {
      // if you return a list (or an object) automatically converted to JSON format
      return this.usersService.getUsers();
   }

   // if there are 2 GET calls to the same route, only the first one will always go through, not the second one
   // you can obvisouly specify the endpoint, here /users/:userId
   // and access the params thanks to @Params where you have to specify the type of your params just like for the POST call
   @Get(':userId')
   @UseGuards(JwtAuthGuard)
   getUser(@Param('userId') userId: string) {
      return this.usersService.getUser(userId);
   }

   @Patch(':userId')
   updateUser(
      @Param('userId') userId: string,
      @Body('firstName') userFirstName: string,
      @Body('lastName') userLastName: string,
      @Body('email') userEmail: string,
      @Body('password') userPassword: string,
   ) {
      this.usersService.updateUser(userId, userFirstName, userLastName, userEmail, userPassword);
      return null;
   }

   @Delete(':userId')
   removeUser(@Param('userId') userId: string) {
      this.usersService.deleteUser(userId);
      return null;
   }
}
