import { Component } from '@angular/core';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  slidesForModule: string[] = [ //this is for slider module
    'assets/shop-adv/wine_adv4.webp', 
    'assets/shop-adv/wine_adv2.jpg',
    'assets/shop-adv/wine_adv3.jpg', 
  ];
  working = true;

  constructor(private productService: ProductsService) { 
    this.productService.getProducts()
  }
  AllProducts$ = this.productService.AllProducts;
  page = 1;
  

  rangeSliderDisplay = 'none';
  getRangeValues(values: number[]) {
    // console.log(values)
  }
  toggleRangeSlider() { 
    if (this.rangeSliderDisplay == 'none') {
      this.rangeSliderDisplay = 'block';
    }
    else { 
      this.rangeSliderDisplay = 'none';
    }
    
  }

 

}
