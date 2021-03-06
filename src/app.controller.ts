import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
   constructor(private appService: AppService) {}

   @Get()
   @Header('Content-Type', 'test/html')
   getHello(): { name: string } {
      return { name: 'Max' };
      // return this.appService.getHello();
   }
}
