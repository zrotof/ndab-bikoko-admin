import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertSecondToStringHourPipe } from '../../pipes/convertSecondToStringHour/convert-second-to-string-hour.pipe';

@NgModule({
  declarations: [
    ConvertSecondToStringHourPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ConvertSecondToStringHourPipe
  ]
})
export class PipesModule { }
