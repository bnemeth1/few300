import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from 'rxjs/internal/scheduler/Action';
import { HttpClient } from '@angular/common/http';
import * as holidayActions from '../actions/holidays.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HolidayEntity } from '../reducers/holidays.reducer';
import { environment } from '../../../../environments/environment';


@Injectable()
export class HolidayEffects {

  // when we get a holidayAdded -> (holidayAddedSuccess | holidayAddedFalure)
  saveTheHoliday$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(holidayActions.addHoliday),
        switchMap((originalAction) => this.client.post<HolidayEntity>(`${environment.rootApiUrl}holidays`, {
          name: originalAction.payload.name,
          date: originalAction.payload.date
        }).pipe(
          map(newHoliday => holidayActions.addHolidaySucceeded({ payload: newHoliday, oldId: originalAction.payload.id })),
          catchError((err) => of(holidayActions.addHolidayFailed({
            payload: originalAction.payload,
            message: 'Could not add the holiday. IT IS FAKE'
          })))
        ))
      )
    , { dispatch: true });

  // when we get loadHolidays -> loadHolidaySucceeded
  loadTheHolidays$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(holidayActions.loadHolidays),
        switchMap(() => this.client.get<GetHolidaysResponse>(`${environment.rootApiUrl}holidays`)
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
