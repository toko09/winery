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
    //
    //
    //gotta fix this queryParams bro 
    
    let langCode = window.location.href.slice(-2);      //get url langcode
    
    if (langCode === '0/') {                            //set lang query after creating 
      this.router.navigate([], { queryParams: { lang: 'en' } })
      langCode = 'en'; 
    }
    this.translocoService.setActiveLang(langCode);
  }

  dropdown = this.el.nativeElement.querySelector('.dropdown');
  isOpenLangBar = false;
  openDropdown() {
    this.dropdown = this.el.nativeElement.querySelector('.dropdown');
    // console.log("langbar open =" + this.isOpenLangBar)
    if (this.isOpenLangBar) {
      this.render.setStyle(this.dropdown, 'display', 'none');
      this.isOpenLangBar = false;
    }
    else { 
      this.render.setStyle(this.dropdown, 'display', 'block');
      setTimeout(() => { this.isOpenLangBar = true;},100)
    }
    

  }

  switchPage(link: string) { 
    this.router.navigate([link], { queryParamsHandling: 'merge' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  changeLang(code:string) {                        //changing language
    this.translocoService.setActiveLang(`${code}`);//
    // console.log(code)
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
  mobileNav = false;
  openHamNav() {
    if (window.innerWidth < 800) { 

      const nav = this.el.nativeElement.querySelector('.navh3s');
      if (!this.mobileNav) {
        nav.style.width = '220px';       
        setTimeout(() => { this.mobileNav = true;},100)
      }
      else {
        nav.style.width = '0';
        this.mobileNav = false
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
      this.openDropdown()
    }
      
  }



}
  


