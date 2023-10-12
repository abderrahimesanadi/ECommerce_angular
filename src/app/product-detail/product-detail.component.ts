import { Component } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Router } from "@angular/router"
import { Panier } from '../panier';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdRatingConfig } from '../rating-config';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  albums: any = [];
  product: Product | undefined;
  panier: Panier[] | undefined;
  imagesUrl = 'http://localhost:8080/';


  constructor(
    private _lightbox: Lightbox,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }
  getProduct(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.productService.getProduct(slug)
      .subscribe((product) => {
        this.product = product;
        for (let image of product.images) {
          const src = this.imagesUrl + image.path;
          const caption = image.path + ' caption';
          const thumb = src;
          const album = {
            src: src,
            caption: caption,
            thumb: thumb
          };

          this.albums.push(album);

        }

      });
  }

  addToPanier(id: number) {
    this.router.navigate(['/panier', id])

  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.albums, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

}
