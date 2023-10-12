import { Component } from '@angular/core';

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

  validateOrder(firstName: string, lastName: string, email: string, password: string, adresse: string): void {

    alert(adresse);
    /*this.productService.registerTo(email, password, firstName, lastName)
      .subscribe((user) => {
        this.user = user;
        console.log(user);
        if (user.token != undefined) {
          this.location.back();
        }
      });*/
  }

}
