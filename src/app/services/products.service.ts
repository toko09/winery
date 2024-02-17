import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../types';
import { BehaviorSubject, Subscription, filter, map, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'assets/API/products.json'; // Path to your local JSON file

  constructor(private http: HttpClient, private actRoute: ActivatedRoute) {}

  private httpSubscription: Subscription = new Subscription();
  private routerSubscription: Subscription = new Subscription();

  private AllProducts$ = new BehaviorSubject<Product[]>([]);

  get AllProducts() {
    return this.AllProducts$.asObservable();
  }

  getProducts() {
    this.http.get<Product[]>(`${this.apiUrl}`).subscribe((response) => {
      this.AllProducts$.next(response);
    });
  }
  shopProducts() {
    this.routerSubscription.unsubscribe();
    this.httpSubscription.unsubscribe();

    this.httpSubscription = this.http
      .get<Product[]>(`${this.apiUrl}`)
      .subscribe((response) => {
        this.routerSubscription = this.actRoute.queryParams.subscribe(
          (params) => {
            // console.log(params['color'])
            if (params['name']) {
              response = response.filter((products) =>
                products.name.toLocaleLowerCase().includes(params['name'])
              );
            }
            if (params['size']) {
              response = response.filter((products) => {}); //Nosize
            }
            if (params['color']) {
              response = response.filter(
                (products) => products.color == params['color']
              );
            }
            if (params['priceStart']) {
              const priceMin = parseFloat(params['priceStart']);
              const priceMax = parseFloat(params['priceMax']);
              response = response.filter((products) => {
                return products.price > priceMin && products.price < priceMax;
              });
            }
          }
        );
        this.AllProducts$.next(response);
      });
  }
}
