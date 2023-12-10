import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { HighchartsChartModule } from 'highcharts-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartWrapperComponent } from './components/chart-wrapper/chart-wrapper.component';
import { ChartComponent } from './components/chart/chart.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdditionmatbuttonDirective } from './additionmatbutton.directive';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ChartWrapperComponent,
    ChartComponent,
    AdditionmatbuttonDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
    HighchartsChartModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
