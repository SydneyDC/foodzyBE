import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
   // no imports in this case
   // imports: []
   controllers: [ProductsController],
   providers: [ProductsService],
})
export class ProductsModule {}
