import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.css']
})
export class ProductComponentComponent {

  products: Product[] = [];
  productsUrl = 'http://localhost:8080/';  // URL to web api


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
    console.log(this.products);
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }
}
