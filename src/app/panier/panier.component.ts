import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Panier } from '../panier';
import { Router } from "@angular/router"

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {

  panier: Panier[] = [];
  total: number = 0;
  productsUrl = 'http://localhost:8080/';  // URL to web api

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showPanier(this.route.snapshot.paramMap.get('id'));

  }

  showPanier(id: string | null): void {
    this.productService.addToPanier(id)
      .subscribe((panier) => {
        this.panier = panier;

        //this.total = total;
        console.log(this.panier);

      });
  }
  removeFromPanier(id: number): void {
    this.productService.removeFromPanier(id)
      .subscribe((panier) => {
        this.panier = panier;
        //this.total = total;
        console.log(this.panier);
      });
  }

}
