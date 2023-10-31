import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  public selectedDate$ = new BehaviorSubject<string>(
    dayjs().format('YYYY-MM-DD')
  );

  public changeDate(newDate: string): void {
    this.selectedDate$.next(newDate);
  }
}
