import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number): string {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);

    return prodId;
  }

  getProducts(): Product[] {
    // Returns a pointer to object (not a copy)
    // return this.products;

    // Returns a copy of the object not the elements
    return [...this.products];
  }

  getProduct(productId: string): Product {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateProduct(productId: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(productId);
    const updateProduct = { ...product };

    !!title ? (updateProduct.title = title) : '';
    !!desc ? (updateProduct.description = desc) : '';
    !!price ? (updateProduct.price = price) : '';

    this.products[index] = updateProduct;
  }

  deleteProduct(prodId: string) {
    const [_, index] = this.findProduct(prodId);
    this.products.splice(index, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id == id);
    const product = this.products[productIndex];

    if (!product) {
      throw new NotFoundException('Could not find product.');
    }

    return [product, productIndex];
  }
}
