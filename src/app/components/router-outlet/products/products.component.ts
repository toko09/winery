import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../types';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  
  constructor(private productService: ProductsService) { 
    this.productService.getProducts()
  }
  AllProducts = this.productService.AllProducts;
  
 
}



