
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { SlideInterface } from '../../types/slide.interface';

@Component({
  selector: 'image-slider',
  templateUrl: './imageSlider.component.html',
  styleUrls: ['./imageSlider.component.css'],
})
export class ImageSliderComponent implements OnInit, OnDestroy {

  constructor(private el: ElementRef) { }
  urlToFile = '../../../../../assets/images_for_slider_module'
  slides: SlideInterface[] = [
    { url: '../../../../../assets/images_for_slider_module/building_1.jpg', title: 'beach' },
    { url: '../../../../../assets/images_for_slider_module/building_2.avif', title: 'boat' },
    { url: '../../../../../assets/images_for_slider_module/building_3.jpg', title: 'forest' },
    // { url: '/assets/CarouselImages/image-4.jpeg', title: 'city' },
    // { url: '/assets/CarouselImages/image-5.jpeg', title: 'italy' },
  ];
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
      ? this.slides.length - 1
      : this.currentIndex - 1;

    this.resetTimer();
    this.currentIndex = newIndex;
    
  }

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.slides.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;

    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToSlide(slideIndex: number): void {
    this.resetTimer();
    this.currentIndex = slideIndex;
    
  }

  getCurrentSlideUrl() {
    return `url('${this.slides[this.currentIndex].url}')`;
  }

}