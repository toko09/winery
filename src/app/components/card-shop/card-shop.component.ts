import { Component, Input } from '@angular/core';
import { Product, cartProduct } from '../../types';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-card-shop',
  templateUrl: './card-shop.component.html',
  styleUrl: './card-shop.component.css'
})
export class CardShopComponent {
  @Input() cardData !: Product
  
  constructor(private productsService: ProductsService) { }

  addToCart(wine:Product) {
    this.productsService.addToCart({
      quantity: 1,
      id: wine.id,
      name : wine.name,
      price: wine.price,
      imageUrl: wine.imageUrl,
      color: wine.color,
    })
  }
}
