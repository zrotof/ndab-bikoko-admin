import { NgModule } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ChartStackedComponent } from '../../components/chart-stacked/chart-stacked.component';

@NgModule({
  declarations: [
    ChartStackedComponent
  ],
  imports: [
    ChartModule
  ],
  exports : [
    ChartStackedComponent,
    ChartModule
  ]
})
export class ChartjsModule { }
