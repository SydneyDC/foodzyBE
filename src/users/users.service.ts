import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './user.model';

@Injectable()
export class UsersService {
   // Adding private in front of users makes sure we can only access this "users" array from inside the service and that our service methods are the only way of interracting with it.
   // This ensure that we can never edit or directly tap into users without going through a method.
   // This way we also interract with the data in the same way, in this case for example it ensures we also generate the id the same way
   private users: User[] = [
      {
         id: '123',
         firstName: 'John',
         lastName: 'Wick',
         email: 'test123@test.com',
         password: 'Test1234',
      },
   ];

   insertUser(firstName: string, lastName: string, email: string, password: string) {
      const userId = Math.random().toString();
      const newUser = new User(userId, firstName, lastName, email, password);
      this.users.push(newUser);
      return userId;
   }

   getUsers() {
      // we should make sure we are returning a copy of our array (research reference types in javascript) which is why we deconstruct the array.
      //We should additionaly map on it and create copies for each value (if they are objects or arrays) to make sure those values still can't be edited from outside our method
      return [...this.users];
   }

   getUser(userId: string) {
      const user = this.findUser(userId)[0];
      return { ...user };
   }

   getUserByEmail(email: string): User | undefined {
      return this.users.find((user) => user.email === email);
   }

   updateUser(
      userId: string,
      firstName: string,
      lastName: string,
      email: string,
      password: string,
   ) {
      // same as doing this
      // const user = this.findUser(userId)[0];
      // const index = this.findUser(userId)[1];
      const [user, index] = this.findUser(userId);
      const updatedUser = { ...user };

      if (firstName) {
         updatedUser.firstName = firstName;
      }
      if (lastName) {
         updatedUser.lastName = lastName;
      }
      if (email) {
         updatedUser.email = email;
      }
      if (password) {
         updatedUser.password = password;
      }
      this.users[index] = updatedUser;
   }

   deleteUser(userId: string) {
      // if we want to use the array destructuring on the tuple but don't actually need the first element "Prodcut" we can specify that by putting an _ as first element of the array
      // the same result would be achieved with the following code
      // const index = this.findUser(userId)[1];
      const [_, index] = this.findUser(userId);
      this.users.splice(index, 1);
   }

   // this method should only be called from inside this service, which is why we set it to private
   // this method will always return an array of only 2 elements where the first element will always be a User and the second element always a string (called a tuple array)
   private findUser(id: string): [User, number] {
      const userIndex = this.users.findIndex((user) => user.id === id);
      const user = this.users[userIndex];
      if (!user) {
         throw new NotFoundException('Could not find user.');
      }
      return [user, userIndex];
   }
}
