import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/holidays-list-control.action';


export interface HolidayListControlState {
  showAll: boolean;
  sortBy: string;
}

const initialState: HolidayListControlState = {
  showAll: false,
  sortBy: 'name'
};

export function reducer(state: HolidayListControlState = initialState, action: Action) {
  return myReducer(state, action);
}

const myReducer = createReducer(
  initialState,
  on(actions.showAll, (state) => ({ ...state, showAll: true })),
  on(actions.showUpcoming, (state) => ({ ...state, showAll: false })),
  on(actions.sortByDate, (state) => ({ ...state, sortBy: 'date' })),
  on(actions.sortByName, (state) => ({ ...state, sortBy: 'name' }))
);
