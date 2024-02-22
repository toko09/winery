import { Component, Input } from '@angular/core';
import { Product } from '../../types';

@Component({
  selector: 'app-card-shop',
  templateUrl: './card-shop.component.html',
  styleUrl: './card-shop.component.css'
})
export class CardShopComponent {
  @Input() cardData !: Product
  
  addToCart(wine:Product) {
      console.log(wine)
   }
}
