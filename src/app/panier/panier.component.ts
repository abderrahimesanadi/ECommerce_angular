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

  panier: any[] = [];
  total: number = 0;
  productsUrl = 'http://localhost:8080/';

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
        console.log("this.panier");
        localStorage.setItem("panier", panier);
        this.panier = localStorage.getItem("panier") as any;
        console.log(localStorage.getItem("panier"));
        for (var i = 0; i < this.panier.length; i++) {
          this.total = this.total + (this.panier[i].pr.price * this.panier[i].quantity);
        }

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

  orderPanier() {
    this.router.navigate(['/order']);
  }

}
