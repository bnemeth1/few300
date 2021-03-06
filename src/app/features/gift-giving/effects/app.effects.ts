import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as appActions from '../../../actions/app.actions';
import * as holidayActions from '../actions/holidays.action';
import * as recipientActions from '../actions/recipients.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class AppEffects {

  // turn addHolidayFailed -> applicationError
  addHolidayFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(holidayActions.addHolidayFailed),
      map((x) => appActions.applicationError({ message: x.message, feature: 'Gift Giving' }))
    )
  );

  // turn applicationStarted into loadHolidays
  loadDataOnAppStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => holidayActions.loadHolidays())
    )
  );

  loadMoreDataOnAppStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => recipientActions.loadRecipients())
    )
  );

  constructor(private actions$: Actions) {

  }
}
