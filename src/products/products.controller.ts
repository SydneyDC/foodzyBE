import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
   constructor(private readonly productsService: ProductsService) {}

   @Post()
   addProduct(
      //@Body () completeBody: {title: string, description: string, price: number}
      @Body('title') productTitle: string,
      @Body('description') productDescription: string,
      @Body('price') productPrice: number,
   ) {
      // we are able not to specify any type here thanks to typescript capacity to infer type
      // remember if you don't manage this data with a database, it will refresh the values after each code update
      // in this case for example our list of products create by our post method would go back to an empty array
      const generatedId = this.productsService.insertProduct(
         productTitle,
         productDescription,
         productPrice,
      );
      return { id: generatedId };
   }

   @Get()
   getAllProducts() {
      // if you return a list (or an object) automatically converted to JSON format
      return this.productsService.getProducts();
   }

   // if there are 2 GET calls to the same route, only the first one will always go through, not the second one
   // you can obvisouly specify the endpoint, here /products/:productId
   // and access the params thanks to @Params where you have to specify the type of your params just like for the POST call
   @Get(':productId')
   getProduct(@Param('productId') productId: string) {
      return this.productsService.getSingleProduct(productId);
   }

   @Patch(':productId')
   updateProduct(
      @Param('productId') productId: string,
      @Body('title') productTitle: string,
      @Body('description') productDescription: string,
      @Body('price') productPrice: number,
   ) {
      this.productsService.updateProduct(productId, productTitle, productDescription, productPrice);
      return null;
   }

   @Delete(':productId')
   removeProduct(@Param('productId') productId: string) {
      this.productsService.deleteProduct(productId);
      return null;
   }
}
