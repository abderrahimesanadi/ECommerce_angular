import { Component } from '@angular/core';
import { User } from '../user';
import { ProductService } from '../product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  user: User | undefined;

  constructor(private productService: ProductService,
    private location: Location
  ) {
  }

  registerTo(firstName: string, lastName: string, email: string, password: string): void {
    this.productService.registerTo(email, password, firstName, lastName)
      .subscribe((user) => {
        this.user = user;
        console.log(user);
        if (user.token != undefined) {
          this.location.back();
        }
      });
  }
}
