import {  Component, ElementRef, HostListener, Renderer2, RendererStyleFlags2 } from '@angular/core';
import {  Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  {
  constructor(private translocoService: TranslocoService,
    private router: Router,
    private el: ElementRef,
    private render: Renderer2) { 
    
    let langCode = window.location.href.slice(-2);      //get url langcode
    if (langCode === '0/') {                            //set lang query after creating 
      this.router.navigate([], { queryParams: { lang: 'en' } })
      langCode = 'en'; 
    }
    this.translocoService.setActiveLang(langCode);
  }
  dropdown = this.el.nativeElement.querySelector('.dropdown');
  
  isOpen = false
  openDropdown() {
    this.dropdown = this.el.nativeElement.querySelector('.dropdown');
    console.log(this.isOpen)
    if (this.isOpen) {
      this.render.setStyle(this.dropdown, 'display', 'none');
      this.isOpen = false
    }
    else { 
      this.render.setStyle(this.dropdown, 'display', 'block');
      this.isOpen = true
    }
    

  }


  changeLang(code:string) {                        //changing language
    this.translocoService.setActiveLang(`${code}`);//
    console.log(code)
    this.router.navigate([], { queryParams: { lang: code } });

  }

  
  pseudoClassBorder = 'whiteBorder'; //changing styles
  pseudoClassNav = 'navExpanded';    //
  @HostListener('window:scroll', []) //
  onWindowScroll() {                 //       
    if (window.scrollY > 50) {       //
      this.pseudoClassNav = 'navFolded'
      this.pseudoClassBorder = 'blackBorder';
      // const ham = this.el.nativeElement.querySelector('.hamButton"')
      // ham.style.color = 'black'
     }
    else { 
      this.pseudoClassNav = 'navExpanded'
      this.pseudoClassBorder = 'whiteBorder';
    }
  }
  openHamNav() {
    if (window.innerWidth < 800) { 

      const nav = this.el.nativeElement.querySelector('.navh3s');
      const computedWidth = window.getComputedStyle(nav)
      if (computedWidth.width === '0px') {
        nav.style.width = '220px';
      } else {
        nav.style.width = '0';
      }
    }
  }


  

}
  


