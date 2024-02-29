import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, cartProduct } from '../types';
import { BehaviorSubject, Subscription, filter, map, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'assets/API/products.json'; // Path to your local JSON file

  constructor(
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private translocoService: TranslocoService) {
    
    const storedItems = localStorage.getItem('cart');
    if (storedItems) { 
      this.CartProducts$.next(JSON.parse(storedItems));
      this.cartNum$.next(JSON.parse(storedItems).length)
      this.getTotalPrice()
      // console.log('used stored cart' + storedItems)
    }
     }

  private httpSubscription: Subscription = new Subscription();
  private routerSubscription: Subscription = new Subscription();

  private AllProducts$ = new BehaviorSubject<Product[]>([]);
  private CartProducts$ = new BehaviorSubject<cartProduct[]>([]);
  private cartNum$ = new BehaviorSubject<number>(0)
  private cartPrice$ = new BehaviorSubject<number>(0);
  
  get AllProducts() {
    return this.AllProducts$.asObservable();
  }
  get cartProducts() { 
    return this.CartProducts$.asObservable()
  }
  get cartNum() { 
    return this.cartNum$.asObservable()
  }
  get cartPrice() { 
    return this.cartPrice$.asObservable()
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
            if (params['name']) {
              response = response.filter((products) => 
                this.translocoService.translate(products.name).toLocaleLowerCase().includes(params['name'])
              );
            }
            if (params['size']) {
              // response = response.filter((products) => {}); 
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

  addToCart(wine: cartProduct) { 

    

    let exists = false;

    const cartProd: cartProduct[] = this.CartProducts$.getValue();//current cart

    for (const prods of cartProd) { //check quantity
      if (prods.id == wine.id) {
        prods.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cartProd));
        exists = true;
        break;
      }
    }
    if (!exists) {  
      cartProd.push(wine);
      exists = false;

    }  

    localStorage.setItem('cart', JSON.stringify(cartProd));

    this.CartProducts$.next(cartProd);

    this.cartNum$.next(cartProd.length);


    this.getTotalPrice()
  }
  removeFromCart(wine: cartProduct) { 
    let cartProd: cartProduct[] = this.CartProducts$.getValue();//current cart

    for (const prods of cartProd) { //check quantity
      if (prods.id == wine.id) {
        prods.quantity -= 1;
        let index = cartProd.indexOf(wine)
        // console.log(cartProd)
        if (prods.quantity <= 0) {
          cartProd.splice(index, 1)
          this.CartProducts$.next(cartProd);
          this.cartNum$.next(cartProd.length);
        }
        localStorage.setItem('cart', JSON.stringify(cartProd));
        break;
      }
    }
    this.getTotalPrice()

  }


  getTotalPrice() {
    let sum = 0;
    let cartProd: cartProduct[] = this.CartProducts$.getValue();//current cart
    for (const prod of cartProd) { 
      sum += (prod.price * prod.quantity)
    } 
    this.cartPrice$.next(sum)

  }
  
}
