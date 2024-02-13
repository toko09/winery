
import { Component, ElementRef, Input, OnDestroy, OnInit, input } from '@angular/core';

@Component({
  selector: 'image-slider',
  templateUrl: './imageSlider.component.html',
  styleUrls: ['./imageSlider.component.css'],
})
export class ImageSliderComponent implements OnInit, OnDestroy {

  @Input() imgArray !: string[];
  @Input() sliderHeight !:number;

  constructor(private el: ElementRef) { }
  urlToFile = '../../../../../assets/images_for_slider_module'

  // imgArray: string[] = [
  //    '../../../../../assets/images_for_slider_module/building_1.jpg',
  //    '../../../../../assets/images_for_slider_module/building_2.avif',
  //    '../../../../../assets/images_for_slider_module/building_3.jpg',
  // ];
  
  currentIndex: number = 0;
  timeoutId?: number;

  ngOnInit(): void {
    this.resetTimer();
  }
  ngOnDestroy() {
    window.clearTimeout(this.timeoutId);
  }
  resetTimer() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    this.timeoutId = window.setTimeout(() => this.goToNext(), 5000);
    // console.log('next?')
  }

  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide
      ? this.imgArray.length - 1
      : this.currentIndex - 1;

    this.resetTimer();
    this.currentIndex = newIndex;
    
  }

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.imgArray.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;

    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToSlide(slideIndex: number): void {
    this.resetTimer();
    this.currentIndex = slideIndex;
    
  }

  getCurrentSlideUrl() {
    return `url('${this.imgArray[this.currentIndex]}')`;
  }

}