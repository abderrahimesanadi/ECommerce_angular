import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Boutique en ligne';
  theme = 'flaty.min.css';

  constructor(@Inject(DOCUMENT) private document: Document, private productService: ProductService) { }

  ngOnInit() {
    this.getTheme();
  }

  getTheme() {
    this.productService.getTheme()
      .subscribe((theme) => {
        this.theme = theme + ".min.css";
        this.loadStyle(this.theme);
        console.log(this.theme);
      });
  }
  loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById(
      'theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `assets/bootstrap/${styleName}`; //<--add assets
    } else {
      const style = this.document.createElement('link');
      style.id = 'theme';
      style.rel = 'stylesheet';
      style.type = 'text/css';
      style.href = `assets/bootstrap/${styleName}`; //<--add assets

      head.appendChild(style);
    }
  }
}
