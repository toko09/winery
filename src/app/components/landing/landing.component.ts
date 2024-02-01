import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {



  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const floatingPhoto = this.el.nativeElement.querySelector('#floatingPhoto');
    const PhotoDivOffset = floatingPhoto.offsetTop;
    const floatingText = this.el.nativeElement.querySelector('#floatingText');
    const textDivOffest = floatingText.offsetTop;

    console.log (PhotoDivOffset, textDivOffest)
    if (PhotoDivOffset <= scrollPosition + 150 ) { 
      this.renderer.setStyle(floatingPhoto, 'margin-top', '0');
    }
    if (textDivOffest <= scrollPosition + 150) {
      this.renderer.setStyle(floatingText, 'margin-top', '0');
    } 
  }
  

}
