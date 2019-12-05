import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from 'rxjs/internal/scheduler/Action';
import { HttpClient } from '@angular/common/http';
import * as holidayActions from '../actions/holidays.action';
import { switchMap, map } from 'rxjs/operators';
import { HolidayEntity } from '../reducers/holidays.reducer';


@Injectable()
export class HolidayEffects {

  // when we get loadHolidays -> loadHolidaySucceeded
  loadTheHolidays$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(holidayActions.loadHolidays),
        switchMap(() => this.client.get<GetHolidaysResponse>('http://localhost:3000/holidays')
          .pipe(
            map(response => response.holidays),
            map((holidays) => holidayActions.loadHolidaySucceeded({ payload: holidays }))
          )
        )
      )
    , { dispatch: true });

  constructor(private actions$: Actions, private client: HttpClient) { }
}


interface GetHolidaysResponse {
  holidays: HolidayEntity[];
}
