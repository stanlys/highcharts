import { Component } from '@angular/core';
import { ITypeOfGraph } from 'src/app/interfaces/chart';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-chart-wrapper',
  templateUrl: './chart-wrapper.component.html',
  styleUrls: ['./chart-wrapper.component.scss'],
})
export class ChartWrapperComponent {
  public charts = Object.keys(ITypeOfGraph)
    .filter((el) => el !== ITypeOfGraph.none)
    .map((el) => ({ name: el, isVisible: true, chartData: [] }));

  // constructor(public chartService: ChartService) {}

  constructor(public chartService: ChartService) {
    this.chartService.getData();
    // this.chartService.charts$.subscribe((newChartData) => {
    //   this.charts = [];
    //   });
      // if (this.chartOptions.series) {
      //   this.chartOptions.series[0] = {
      //     type: this.mainChartType$.value,
      //     data: this.chartService.chartData$.value.get(this.chartName),
      //   };
      //   const additionalChartType = this.additionalChartType$.value;
      //   if (additionalChartType !== ITypeOfGraph.none) {
      //     this.chartOptions.series[1] = {
      //       type: 'line',
      //       data: this.chartService.chartData$.value.get(additionalChartType),
      //     };
      //   }
      //   this.updateFlag = true;
      // }
    // });

    // this.mainChartType$.subscribe((newType) => {
    //   if (this.chartOptions.series) {
    //     this.chartOptions.series[0] = {
    //       type: IChartType[newType],
    //     };
    //     this.updateFlag = true;
    //   }
    // });

    // this.additionalChartType$.subscribe((newChart) => {
    //   if (!this.chartOptions.series) return;
    //   this.chartOptions.series.pop();

    //   if (newChart === ITypeOfGraph.none) {
    //     this.chartOptions.series[1] = {
    //       name: '',
    //       type: 'line',
    //       data: [0],
    //     };
    //     this.chartOptions.series[1].visible = false;
    //     this.chartOptions.series[1].showInLegend = false;
    //   } else {
    //     this.chartOptions.series[1] = {
    //       name: newChart,
    //       type: 'line',
    //       data: this.chartService.chartData$.value.get(newChart),
    //       visible: true,
    //       showInLegend: true,
    //     };
    //   }

    //   this.updateFlag = true;
    // });
  }
}
