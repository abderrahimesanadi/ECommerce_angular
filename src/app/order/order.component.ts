import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { OrderService } from '../order.service';
import { Location } from '@angular/common';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  adresse: string = '';
  user: User | undefined;
  order: string = '';

  constructor(private productService: ProductService, private orderService: OrderService,
    private location: Location, private route: ActivatedRoute,

  ) {
  }

  validateOrder(firstName: string, lastName: string, email: string, password: string, adresse: string): void {

    //alert(adresse);
    const productId = this.route.snapshot.paramMap.get('id');
    console.log(productId);
    this.productService.registerTo(email, password, firstName, lastName)
      .subscribe((user) => {
        this.user = user;
        console.log(user);
        if (user.token != undefined) {
          this.orderService.validateOrder(productId, user.token, adresse)
            .subscribe((order) => {
              this.order = order;
              console.log("order");
              console.log(order);
            });
        } else {
          this.location.back();
        }
      });
  }

}
