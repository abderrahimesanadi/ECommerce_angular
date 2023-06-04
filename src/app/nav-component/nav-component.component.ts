import { Component } from '@angular/core';
import { Category } from '../category';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-nav-component',
  templateUrl: './nav-component.component.html',
  styleUrls: ['./nav-component.component.css']
})
export class NavComponentComponent {

  categories: Category[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.productService.getCategories()
      .subscribe(categories => this.categories = categories);
  }
}
