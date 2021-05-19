import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
   // Adding private in front of products makes sure we can only access this "products" array from inside the service and that our service methods are the only way of interracting with it.
   // This ensure that we can never edit or directly tap into products without going through a method.
   // This way we also interract with the data in the same way, in this case for example it ensures we also generate the id the same way
   private products: Product[] = [];

   insertProduct(title: string, description: string, price: number) {
      const productId = Math.random().toString();
      const newProduct = new Product(productId, title, description, price);
      this.products.push(newProduct);
      return productId;
   }

   getProducts() {
      // we should make sure we are returning a copy of our array (research reference types in javascript) which is why we deconstruct the array.
      //We should additionaly map on it and create copies for each value (if they are objects or arrays) to make sure those values still can't be edited from outside our method
      return [...this.products];
   }

   getSingleProduct(productId: string) {
      const product = this.findProduct(productId)[0];
      return { ...product };
   }

   updateProduct(productId: string, title: string, description: string, price: number) {
      // same as doing this
      // const product = this.findProduct(productId)[0];
      // const index = this.findProduct(productId)[1];
      const [product, index] = this.findProduct(productId);
      const updatedProduct = { ...product };

      if (title) {
         updatedProduct.title = title;
      }
      if (description) {
         updatedProduct.description = description;
      }
      if (price) {
         updatedProduct.price = price;
      }
      this.products[index] = updatedProduct;
   }

   deleteProduct(productId: string) {
      // if we want to use the array destructuring on the tuple but don't actually need the first element "Prodcut" we can specify that by putting an _ as first element of the array
      // the same result would be achieved with the following code
      // const index = this.findProduct(productId)[1];
      const [_, index] = this.findProduct(productId);
      this.products.splice(index, 1);
   }

   // this method should only be called from inside this service, which is why we set it to private
   // this method will always return an array of only 2 elements where the first element will always be a Product and the second element always a number (called a tuple array)
   private findProduct(id: string): [Product, number] {
      const productIndex = this.products.findIndex((product) => product.id === id);
      const product = this.products[productIndex];
      if (!product) {
         throw new NotFoundException('Could not find product.');
      }
      return [product, productIndex];
   }
}
