import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as dayjs from 'dayjs';
import { debounceTime, fromEvent, map } from 'rxjs';
import { ChartService } from 'src/app/services/chart.service';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(
    public dateService: DateService,
    private chartService: ChartService
  ) {
    this.search = {} as ElementRef;
  }

  public searchValue = '';

  @ViewChild('searchChart', { static: true })
  search: ElementRef<HTMLInputElement>;

  public test(e: Event) {
    const newDate = (e.target as HTMLInputElement).value;
    this.dateService.changeDate(newDate);
  }

  public inputNewSearchValue(e: any): void {
    console.log(e);
  }

  ngOnInit(): void {
    fromEvent(this.search.nativeElement, 'input')
      .pipe(
        debounceTime(500),
        map((search) =>
          (search.target as HTMLInputElement).value.length >= 5
            ? (search.target as HTMLInputElement).value
            : ''
        )
      )
      .subscribe((search) => {
        this.chartService.drawChartsByName(search);
      });
  }
}
