import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'range-slider',
  templateUrl: './range-slider.component.html',
  styleUrl: './range-slider.component.css',
})
export class RangeSliderComponent {

  @Output() rangeValues: EventEmitter<number[]> = new EventEmitter<number[]>();

  constructor(private el: ElementRef) { }
  



  leftPosition = 0;
  rightPosition = 200;
  line_start = 8; //half of circles width
  line_width = 200;

  clickDiff = 0; 
  isDragging = false;

  divPosition: number = 0;
  circlePosition: number = 0;
  minOrMax = '';

  
  values :number[] = [0, 200];
  
  // private values$ = new BehaviorSubject<number[]>([]);

  // get AllProducts() {
  //   return this.values$.asObservable();
  // }


  onMouseDown(event: MouseEvent, handle: '.min' | '.max') {

    event.preventDefault();
    this.minOrMax = handle;
    
    this.isDragging = true;

    this.divPosition = this.el.nativeElement.querySelector('.range').getBoundingClientRect()['x'];

    this.circlePosition = this.el.nativeElement.querySelector(`${handle}`).getBoundingClientRect()['x'];    
    
    this.clickDiff = event.x - this.circlePosition;
  
  }
  onTouchStart(event: TouchEvent, handle:'.min' | '.max') { 

    event.preventDefault();
    this.minOrMax = handle;
    
    this.isDragging = true;

    this.divPosition = this.el.nativeElement.querySelector('.range').getBoundingClientRect()['x'];

    this.circlePosition = this.el.nativeElement.querySelector(`${handle}`).getBoundingClientRect()['x'];    
    
    this.clickDiff = event.touches[0].clientX - this.circlePosition;



  }


  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      let calculatedPosition = event.x - this.clickDiff - this.divPosition;

      if (calculatedPosition >= 0 && calculatedPosition <= 201) { 
        
        if (this.minOrMax == '.min' && calculatedPosition < this.rightPosition - 19) {
          this.leftPosition = Math.floor(calculatedPosition / 10) * 10;
          this.line_start = this.leftPosition + 8;
          this.line_width = this.rightPosition - this.leftPosition;
          this.values[0] = this.leftPosition;
          this.rangeValues.emit(this.values);   
        }
        else if (this.minOrMax == '.max' && calculatedPosition > this.leftPosition + 20) {
          this.rightPosition = Math.floor(calculatedPosition / 10) * 10;
          this.line_width = this.rightPosition - this.leftPosition;
          this.values[1] = this.rightPosition;
          this.rangeValues.emit(this.values);
        }
      }
    }
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(event: TouchEvent) { 
    if (this.isDragging) {
      let calculatedPosition = event.touches[0].clientX - this.clickDiff - this.divPosition;

      if (calculatedPosition >= 0 && calculatedPosition <= 201) { 
        
        if (this.minOrMax == '.min' && calculatedPosition < this.rightPosition - 19) {
          this.leftPosition = Math.floor(calculatedPosition / 10) * 10;
          this.line_start = this.leftPosition + 8;
          this.line_width = this.rightPosition - this.leftPosition;
          this.values[0] = this.leftPosition;
          this.rangeValues.emit(this.values);   
        }
        else if (this.minOrMax == '.max' && calculatedPosition > this.leftPosition + 20) {
          this.rightPosition = Math.floor(calculatedPosition / 10) * 10;
          this.line_width = this.rightPosition - this.leftPosition;
          this.values[1] = this.rightPosition;
          this.rangeValues.emit(this.values);
        }
      }
    }
  }






  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }
  @HostListener('document:touchend')
  onTouchEnd() { 
    this.isDragging = false;

  }
}