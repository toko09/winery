import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeSliderComponent } from './components/range-slider.component';



@NgModule({
  declarations: [
    RangeSliderComponent
  ],
  exports: [
    RangeSliderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RangeSliderModule { }
