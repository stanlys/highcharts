import { Component } from '@angular/core';
import * as dayjs from 'dayjs';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(public dateService: DateService) {}

  public test(e: Event) {
    const newDate = (e.target as HTMLInputElement).value;
    this.dateService.changeDate(newDate);
  }
}
