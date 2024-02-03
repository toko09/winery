import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing2',
  templateUrl: './landing2.component.html',
  styleUrl: './landing2.component.css'
})
export class Landing2Component {
  constructor(private el: ElementRef, private router:Router) { }
  scrollPhotos = [
    "../../../../assets/scrollPhotos/winery_dema_kisi.png",
    "../../../../assets/scrollPhotos/winery_dema_kosi.png",
    "../../../../assets/scrollPhotos/winery_dema_khikhvi.png",
    "../../../../assets/scrollPhotos/Casreli_kisi_2020.png",
    "../../../../assets/scrollPhotos/nanua_otskhanuri_2022.png",
    " "
  ];
  blankLink = '';
  currentIndex = 0; //currentIndex + slideIndex  
  crslNum = 3;

  moveLeft() {
    this.currentIndex -= 1;
    
  }
  moveRight() {
    this.currentIndex = this.currentIndex + 1; 
  }
  

  indexCounter(index: number): number {  ///index of image in scrollPhotos array
    
    if (index > this.scrollPhotos.length -2) {
      return index % (this.scrollPhotos.length - 1);
    }
    else if (index < 0) {
      while (index < 0) { 
        index += this.scrollPhotos.length - 1
      }
      return (index );
    }
    else {
      return index;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth < 1200 && window.innerWidth> 400) {
      this.crslNum = window.innerWidth / 400;

    }
  }
  ngOnInit(): void {  
    if (window.innerWidth < 1200) {
      this.crslNum = window.innerWidth / 400;
    }
    
  }
  switchToProd() { 
    this.router.navigate(['products'], { queryParamsHandling: 'merge' });
  }
}
