import { Component } from '@angular/core';
import { Category } from '../category';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categories: Category[] = [];
  curl = 'http://localhost:8080/';  // URL to web api


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.productService.getCategories()
      .subscribe(categories => this.categories = categories);
  }
}
