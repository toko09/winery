import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../types';
import { BehaviorSubject} from 'rxjs';

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
        console.log(response)
      });
  }
}
