import { Component, Input, OnInit } from '@angular/core';
import {
  IChart,
  IChartType,
  ITypeOfGraph,
  TChartType,
} from 'src/app/interfaces/chart';
import { ChartService } from 'src/app/services/chart.service';
import * as Highcharts from 'highcharts';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements IChart, OnInit {
  @Input()
  chartName!: string;

  @Input()
  isVisible!: boolean;

  public mainChartType$ = new BehaviorSubject<TChartType>('bar');
  public additionalChartType$ = new BehaviorSubject<ITypeOfGraph>(
    ITypeOfGraph.none
  );

  public addtitionalCharts: Array<string> = Object.keys(ITypeOfGraph);

  public mainGraphColor = `#000000`;
  public additionalGraphColor = `#000000`;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  updateFlag = false;

  constructor(private chartService: ChartService) {
    this.chartService.chartData$.subscribe((newChartData) => {
      if (this.chartOptions.series) {
        this.chartOptions.series[0] = {
          type: this.mainChartType$.value,
          data: this.chartService.chartData$.value.get(this.chartName),
        };
        const additionalChartType = this.additionalChartType$.value;
        if (additionalChartType !== ITypeOfGraph.none) {
          this.chartOptions.series[1] = {
            type: 'line',
            data: this.chartService.chartData$.value.get(additionalChartType),
          };
        }
        this.updateFlag = true;
      }
    });

    this.mainChartType$.subscribe((newType) => {
      if (this.chartOptions.series) {
        this.chartOptions.series[0] = {
          type: IChartType[newType],
        };
        this.updateFlag = true;
      }
    });

    this.additionalChartType$.subscribe((newChart) => {
      if (!this.chartOptions.series) return;
      this.chartOptions.series.pop();

      if (newChart === ITypeOfGraph.none) {
        this.chartOptions.series[1] = {
          name: '',
          type: 'line',
          data: [0],
        };
        this.chartOptions.series[1].visible = false;
        this.chartOptions.series[1].showInLegend = false;
      } else {
        this.chartOptions.series[1] = {
          name: newChart,
          type: 'line',
          data: this.chartService.chartData$.value.get(newChart),
          visible: true,
          showInLegend: true,
        };
      }

      this.updateFlag = true;
    });
  }

  public changeChart(e: any): void {
    this.mainChartType$.next(e.value);
  }

  public changeAdditionalChart(e: any): void {
    this.additionalChartType$.next(e.value);
  }

  public updateColors(): void {
    this.mainGraphColor = `#${Math.floor(Math.random() * 16777215).toString(
      16
    )}`;

    this.additionalGraphColor = `#${Math.floor(
      Math.random() * 16777215
    ).toString(16)}`;

    if (this.chartOptions.series) {
      this.chartOptions.series[0] = {
        type: this.mainChartType$.value,
        color: this.mainGraphColor,
      };

      this.chartOptions.series[1] = {
        type: 'line',
        color: this.additionalGraphColor,
      };
    }

    this.updateFlag = true;
  }

  ngOnInit(): void {
    this.updateColors();
    this.chartOptions = this.genGraph(this.chartName);
    this.addtitionalCharts = this.addtitionalCharts.filter(
      (el) => el != this.chartName
    );
  }

  public genGraph(chartName: string): Highcharts.Options {
    return {
      title: { text: chartName },
      series: [
        {
          name: chartName,
          type: 'column',
          data: this.chartService.chartData$.value.get(chartName),
          color: this.mainGraphColor,
        },
        {
          name: '',
          type: 'line',
          data: [],
          color: this.additionalGraphColor,
          visible: false,
          showInLegend: false,
        },
      ],
    };
  }
}
