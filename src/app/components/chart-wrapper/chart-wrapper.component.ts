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
    .map((el) => ({ name: el, isVisible: true }));

  constructor(private chartService: ChartService) {
    this.chartService.getData();
  }
}
