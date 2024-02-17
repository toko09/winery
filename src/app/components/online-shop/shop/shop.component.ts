import { Component } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';

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
  working = !false;

  constructor(private productService: ProductsService, private router:Router) { 
    this.productService.shopProducts();
  }
  AllProducts$ = this.productService.AllProducts;
  page = 1;
  

  rangeSliderDisplay = 'none';
  toggleRangeSlider() { 
    if (this.rangeSliderDisplay == 'none') {
      this.rangeSliderDisplay = 'block';
    }
    else { 
      this.rangeSliderDisplay = 'none';
    }
    
    
  }
  searchText = '';
  selectedColor = '';
  selectedSize = '';
  filterName() { 
      const newQueryParams = {
      name : this.searchText,   
    };
     this.router.navigate(['shop'], {
      queryParams: newQueryParams,
      queryParamsHandling: 'merge'
     });
     this.productService.shopProducts();

  }
  filterColor() { 
    const newQueryParams = {
      color : this.selectedColor,   
    };
     this.router.navigate(['shop'], {
      queryParams: newQueryParams,
      queryParamsHandling: 'merge'
     });
     this.productService.shopProducts();

  }
  filterSize() { 
    const newQueryParams = {
      size : this.selectedSize,   
    };
     this.router.navigate(['shop'], {
      queryParams: newQueryParams,
      queryParamsHandling: 'merge'
     });
     this.productService.shopProducts();

  }
  filterPrice(range: number[]) { 
    const newQueryParams = {
      priceStart: range[0],
      priceMax:range[1]
    };
     this.router.navigate(['shop'], {
      queryParams: newQueryParams,
      queryParamsHandling: 'merge'
     });
     this.productService.shopProducts();


  }
  
  
}
