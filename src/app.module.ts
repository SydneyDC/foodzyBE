import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductsModule } from './products/products.module';

@Module({
   // you need to link the AppModule to the other modules that make a part of your app, here ProductsModule
   imports: [ProductsModule],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
