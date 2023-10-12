import { Component } from '@angular/core';
import { User } from '../user';
import { ProductService } from '../product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  user: User | undefined;
  error: string = '';

  constructor(private productService: ProductService,
    private location: Location
  ) { }


  ngOnInit(): void {
    //this.loginTo(this.username, this.password);
  }

  loginTo(username: string, password: string): void {
    this.productService.loginTo(username, password)
      .subscribe((user) => {
        this.user = user;
        console.log(user);
        if (user.token != undefined) {
          this.location.back();
        }
      });
  }

}
