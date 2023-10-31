import * as Highcharts from 'highcharts';

export enum IChartType {
  line = 'line',
  bar = 'bar',
}

export type TChartType = 'bar' | 'line';

export enum ITypeOfGraph {
  none = 'none',
  temperature = 'temperature',
  humidity = 'humidity',
  wind = 'wind',
  rainfall = 'rainfall',
}

export type IChartParam = {
  date: Date;
  value: number;
};

export type IChartParams = Array<IChartParam>;

export type IPoints = Array<number>;

export type IChartsData = Map<string, IPoints>;

export interface IChart {
  chartName: string;
  mainGraphColor: string;
  additionalGraphColor: string;
  updateFlag: boolean;
  Highcharts: typeof Highcharts;
}
