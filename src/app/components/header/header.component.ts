import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  RendererStyleFlags2,
} from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ProductsService } from '../../services/products.service';
import { JsonPipe } from '@angular/common';
import { cartProduct } from '../../types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private translocoService: TranslocoService,
    private router: Router,
    private el: ElementRef,
    private render: Renderer2,
    private productsService: ProductsService,
    private actRoute:ActivatedRoute
  ) {
    //
    //

    let langCode = localStorage.getItem('langCode'); //get  langcode

    if (langCode == null) {
      localStorage.setItem('langcode', 'en');
      langCode = 'en';
    }
    this.translocoService.setActiveLang(langCode);
    if (langCode == 'ge') {
      this.langGeo = true;
    } else {
      this.langGeo = false;
    }
  }

  cartNum$ = this.productsService.cartNum;
  cartProducts$ = this.productsService.cartProducts;
  cartTotalPrice$ = this.productsService.cartPrice
  langGeo = false;

  dropdown = this.el.nativeElement.querySelector('.dropdown');
  isOpenLangBar = false;
  openDropdown() {
    this.dropdown = this.el.nativeElement.querySelector('.dropdown');

    if (this.isOpenLangBar) {
      this.render.setStyle(this.dropdown, 'display', 'none');
      this.isOpenLangBar = false;
    } else {
      this.render.setStyle(this.dropdown, 'display', 'block');
      setTimeout(() => {
        this.isOpenLangBar = true;
      }, 100);
    }
  }

  switchPage(link: string) {
    this.router.navigate([link], { queryParamsHandling: 'merge' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  changeLang(code: string) {
    //changing language
    this.translocoService.setActiveLang(`${code}`); //
    // console.log(code)
    this.router.navigate([], { queryParams: { lang: code } });
    localStorage.setItem('langCode', code);

    if (code == 'ge') {
      this.langGeo = true;
    } else {
      this.langGeo = false;
    }
  }

  pseudoClassBorder = 'whiteBorder'; //changing styles
  pseudoClassNav = 'navExpanded'; //
  @HostListener('window:scroll', []) //
  onWindowScroll() {
    //
    if (window.scrollY > 50) {
      //
      this.pseudoClassNav = 'navFolded';
      this.pseudoClassBorder = 'blackBorder';

    } else {
      this.pseudoClassNav = 'navExpanded';
      this.pseudoClassBorder = 'whiteBorder';
    }
  }
  mobileNav = false;
  openHamNav() {
    if (window.innerWidth < 800) {
      const nav = this.el.nativeElement.querySelector('.navh3s');
      if (!this.mobileNav) {
        nav.style.width = '220px';
        setTimeout(() => {
          this.mobileNav = true;
        }, 100);
      } else {
        nav.style.width = '0';
        this.mobileNav = false;
      }
    }
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    if (window.innerWidth < 800) {
      const clickX = event.clientX;

      if (this.mobileNav && clickX > 220) {
        const nav = this.el.nativeElement.querySelector('.navh3s');
        nav.style.width = '0';
        this.mobileNav = false;
        // this.isOpenLangBar = false
      }
    }
    if (this.isOpenLangBar) {
      this.openDropdown();
    }
  }

  cartOpen = false;
  openCart() {
    if (window.innerWidth > 800) {
      const cart = this.el.nativeElement.querySelector('.cartDiv');
      if (this.cartOpen) {
        cart.style.width = '0px';
        this.cartOpen = false;
      }
      else {
        cart.style.width = '300px'
        this.cartOpen = true;
      }
    }
    else { 
      const cart = this.el.nativeElement.querySelector('.cartDiv');
      if (this.cartOpen) {
        cart.style.height = '0px';
        this.cartOpen = false;
      }
      else {
        cart.style.height = '75vh'
        this.cartOpen = true;
      }
      
    }

  }
  removeFromcart(wine: cartProduct) {
    this.productsService.removeFromCart(wine);
  }


  calculatePrice(price: number, quantity: number) { 
    
    let total = price * quantity
    let roundedNumber = Math.round(total *  Math.pow(10,2))/ 100;

      return roundedNumber
  }
 
}
