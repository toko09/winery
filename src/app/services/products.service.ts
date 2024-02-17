import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../types';
import { BehaviorSubject, filter, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'assets/API/products.json'; // Path to your local JSON file

  constructor(private http: HttpClient) { }

  private AllProducts$ = new BehaviorSubject<Product[]>([]);

  get AllProducts() {
    return this.AllProducts$.asObservable();
  }

  getProducts() {

    this.http
      .get<Product[]>(`${this.apiUrl}`)
      .subscribe((response) => {
        this.AllProducts$.next(response)
        // console.log(response)
      });
  }
  filteProducts(searchBy: string, value: string, price?: number[]) {
    this.http
      .get<Product[]>(`${this.apiUrl}`)
      .subscribe((response) => {
        switch (searchBy) { 
          case 'name': { 
            this.AllProducts$.next(response.filter(products => products.name.toLowerCase() === value));           
            break;
          }
          case 'color': { 
            this.AllProducts$.next(response.filter(products => products.color === value))
            break;
          }
          case 'size': {  //we dont have size opttion
            this.AllProducts$.next(response.filter(products => products))
            break;
          }
          default: { 
            break;
          }
        }
        if (price != undefined) { 
          this.AllProducts$.next(response.filter(products => (products.price > price[0]) && products.price<price[1]))

        }
      });
  }
}
