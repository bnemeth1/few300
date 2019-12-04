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

// const initialState = adapter.getInitialState();
const initialState: HolidayState = {
  ids: ['1', '2', '3'],
  entities: {
    1: { id: '1', name: 'Christmas', date: new Date(2019, 11, 25).toISOString() },
    2: { id: '2', name: 'Jeff\'s Birthday', date: new Date(2020, 3, 20).toISOString() },
    3: { id: '3', name: 'Last Birthday', date: new Date(2019, 6, 31).toISOString() }
  }
};

const reducerFunction = createReducer(
  initialState,
  on(actions.addHoliday, (state, action) => adapter.addOne(action.payload, state))
);

export function reducer(state: HolidayState = initialState, action: Action) {
  return reducerFunction(state, action);
}


