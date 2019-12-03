export const featureName = 'giveGivingFeature';
import * as fromHolidays from './holidays.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface GiftGivingState {
  holidays: fromHolidays.HolidayState;
}

export const reducers: ActionReducerMap<GiftGivingState> = {
  holidays: fromHolidays.reducer
};

