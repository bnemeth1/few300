import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { RecipientEntity } from '../reducers/recipients.reducer';
import * as recipientActions from '../actions/recipients.actions';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { of, pipe } from 'rxjs';
import { HolidayEffects } from './holidays.effects';


@Injectable()
export class RecipientEffects {

  /*
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
  */

  // when we get loadHolidays -> loadHolidaySucceeded
  loadTheRecipients$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(recipientActions.loadRecipients),
        switchMap(() => this.client.get<GetRecipientsResponse>(`${environment.rootApiUrl}recipients`)
          .pipe(
            map(response => response.recipients),
            map((recipients) => recipientActions.loadRecipientsSucceeded({ payload: recipients })),
            catchError((err) => of(recipientActions.loadRecipientFailed({
              message: 'Could not load the recipient. IT IS FAKE'
            })))
          )
        )
      )
    , { dispatch: false });

  constructor(private actions$: Actions, private client: HttpClient) { }
}


interface GetRecipientsResponse {
  recipients: RecipientEntity[];
}

interface GetOriginalResponse {
  recipients: RecipientWebResp[];
}

interface RecipientWebResp {
  id: string;
  name: string;
  email: string;
  holidays: string[];
}


