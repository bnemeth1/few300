import { createAction, props } from '@ngrx/store';
import { RecipientEntity } from '../reducers/recipients.reducer';

let currentId;


export const recipientAdded = createAction(
  '[gift giving] add a recipient',
  ({ name, email, selectedHolidayIds }: { name: string; email: string; selectedHolidayIds: string[] }) => ({
    payload: {
      id: 'T' + currentId++,
      name,
      email,
      selectedHolidayIds
    }
  })
);


export const loadRecipients = createAction(
  '[gift giving] load the recipients'
);

export const loadRecipientsSucceeded = createAction(
  '[gift giving] loading the recipient worked',
  props<{ payload: RecipientEntity[] }>()
);

export const loadRecipientFailed = createAction(
  '[gift giving] loading the recipient failed',
  props<{ message: string }>()
);
