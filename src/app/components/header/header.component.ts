import {  Component, ElementRef, HostListener } from '@angular/core';
import {  Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  {
  constructor(private translocoService: TranslocoService,private router: Router, private el: ElementRef) { 
    
    let langCode = window.location.href.slice(-2);      //get url langcode
    if (langCode === '0/') {                            //set lang query after creating 
      this.router.navigate([], { queryParams: { lang: 'en' } })
      langCode = 'en'; 
    }
    this.translocoService.setActiveLang(langCode);
  }
  
  changeLang(code:string) {                        //changing language
    this.translocoService.setActiveLang(`${code}`);//
    console.log(code)
    this.router.navigate([], { queryParams: { lang: code } })
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
    const nav = this.el.nativeElement.querySelector('.navh3s');
    const computedWidth = window.getComputedStyle(nav)
      if (computedWidth.width === '0px') {
        nav.style.width = '220px';
      } else {
        nav.style.width = '0';
      }
    }


  

}
  


