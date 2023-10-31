import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { IChartsData, IPoints, ITypeOfGraph } from '../interfaces/chart';
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

  public chartData$ = new BehaviorSubject<IChartsData>(new Map());

  public getData(date: string = dayjs().format()): void {
    const newData: IChartsData = new Map();
    newData.set(ITypeOfGraph.temperature, this.generateValuesByDate(40, date));
    newData.set(ITypeOfGraph.humidity, this.generateValuesByDate(760, date));
    newData.set(ITypeOfGraph.wind, this.generateValuesByDate(20, date));
    newData.set(ITypeOfGraph.rainfall, this.generateValuesByDate(20, date));
    this.chartData$.next(newData);
  }

  private generateValuesByDate(maxValue: number, date: string): IPoints {
    const dateStart = dayjs(date).startOf('day');
    return new Array(24).fill(1).map((_) => this.generateValue(maxValue));
  }

  private generateValue(maxValue: number): number {
    return Math.round(Math.random() * maxValue) + 1;
  }
}
