import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { RouterModule, Routes } from '@angular/router';

import { Product } from './product';
import { Category } from './category';
import { Panier } from './panier';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = 'http://localhost:8080/api';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  /** GET products from the server */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl + "/products")
      .pipe(
        tap(_ => console.log('fetched Productes')),
        catchError(this.handleError<Product[]>('getProductes', []))
      );
  }

  /** GET cat from the server */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.productsUrl + "/categories")
      .pipe(
        tap(_ => console.log('fetched categories')),
        catchError(this.handleError<Category[]>('getcategories', []))
      );
  }

  /** GET Product by id. Will 404 if id not found */
  getProduct(slug: any): Observable<Product> {
    const url = `${this.productsUrl}/details/${slug}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => console.log(`fetched Product id=${slug}`)),
      catchError(this.handleError<Product>(`getProduct id=${slug}`))
    );
  }

  panier(): Observable<any> {
    return this.http.get(this.productsUrl + "/panier")
      .pipe(
        tap(_ => console.log('fetched panier')),
        catchError(this.handleError<Product[]>('panier', []))
      );
  }

  addToPanier(id: string | null): Observable<any> {
    return this.http.get(this.productsUrl + "/panier/add/" + id)
      .pipe(
        tap(_ => console.log('add to panier' + id)),
        catchError(this.handleError<Product[]>('add to panier', []))
      );
  }

  removeFromPanier(id: number): Observable<any> {
    return this.http.get(this.productsUrl + "/panier/remove/" + id)
      .pipe(
        tap(_ => console.log('removeFromPanier' + id)),
        catchError(this.handleError<Product[]>('removeFromPanier', []))
      );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
