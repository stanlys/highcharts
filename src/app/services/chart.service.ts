import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import {
  IChartsData,
  INewChart,
  IPoints,
  ITypeOfGraph,
} from '../interfaces/chart';
import { BehaviorSubject } from 'rxjs';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor(private dateService: DateService) {
    this.dateService.selectedDate$.subscribe((newDate) => {
      this.getData(newDate);
    });
  }

  public searchChartName$ = new BehaviorSubject<string>('');

  // public chartData$ = new BehaviorSubject<IChartsData>(new Map());

  public charts$ = new BehaviorSubject<INewChart[]>(
    Object.keys(ITypeOfGraph)
      .filter((el) => el !== ITypeOfGraph.none)
      .map((el) => ({ name: el, isVisible: true, chartData: [] }))
  );

  private allCharts = Object.keys(ITypeOfGraph)
    .filter((el) => el !== ITypeOfGraph.none)
    .map((el) => ({ name: el, isVisible: true }));

  public getData(date: string = dayjs().format()): void {
    const newData: IChartsData = new Map();
    newData.set(ITypeOfGraph.temperature, this.generateValuesByDate(40, date));
    newData.set(ITypeOfGraph.humidity, this.generateValuesByDate(760, date));
    newData.set(ITypeOfGraph.wind, this.generateValuesByDate(20, date));
    newData.set(ITypeOfGraph.rainfall, this.generateValuesByDate(20, date));
    // this.chartData$.next(newData);
    const _charts: Array<INewChart>= [];
    newData.forEach((chartData, chartName) => {
      _charts.push({
        name: chartName,
        isVisible: true,
        chartData: chartData as never[],
      });
    });
    this.charts$.next(_charts);
  }

  private generateValuesByDate(maxValue: number, date: string): IPoints {
    const dateStart = dayjs(date).startOf('day');
    return new Array(24).fill(1).map((_) => this.generateValue(maxValue));
  }

  private generateValue(maxValue: number): number {
    return Math.round(Math.random() * maxValue) + 1;
  }

  public drawChartsByName(searchValue: string): void {
    const _charts = this.allCharts.filter(
      (chart) => !chart.name.indexOf(searchValue)
    );
    // this.charts$.next(_charts);
  }
}
