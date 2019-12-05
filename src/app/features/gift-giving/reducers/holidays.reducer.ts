import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/holidays.action';

export interface HolidayEntity {
  id: string;
  name: string;
  date: string;
}

export interface HolidayState extends EntityState<HolidayEntity> {

}

export const adapter = createEntityAdapter<HolidayEntity>();

const initialState = adapter.getInitialState();


const reducerFunction = createReducer(
  initialState,
  on(actions.addHoliday, (state, action) => adapter.addOne(action.payload, state)),
  on(actions.loadHolidaySucceeded, (state, action) => adapter.addAll(action.payload, state)),
  on(actions.addHolidaySucceeded, (state, action) => {
    const oldState = adapter.removeOne(action.oldId, state);  // cannot update the id, so remove one and add one
    return adapter.addOne(action.payload, oldState);
  })
);

export function reducer(state: HolidayState = initialState, action: Action) {
  return reducerFunction(state, action);
}



