export const featureName = 'giveGivingFeature';
import * as fromHolidays from './holidays.reducer';
import * as fromHolidayModels from '../models/holidays';
import * as fromHolidayListControl from './holiday-list-controls.reducer';
import * as fromHolidayListControlsModel from '../models/list-controls';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRecipients from './recipients.reducer';
import * as fromRecipientModels from '../models/recipients';
import { ModuleWithComponentFactories } from '@angular/core';
import * as moment from 'moment';

export interface GiftGivingState {
  holidays: fromHolidays.HolidayState;
  holidayListControls: fromHolidayListControl.HolidayListControlState;
  recipients: fromRecipients.RecipientState;
}

export const reducers: ActionReducerMap<GiftGivingState> = {
  holidays: fromHolidays.reducer,
  holidayListControls: fromHolidayListControl.reducer,
  recipients: fromRecipients.reducer
};


// Selectors

// 1. Feature Selector
const selectGiftFeature = createFeatureSelector<GiftGivingState>(featureName);

// 2. Feature pre branch
const selectHolidaysBranch = createSelector(selectGiftFeature, g => g.holidays);
const selectHolidayListControlsBranch = createSelector(selectGiftFeature, g => g.holidayListControls);
const selectRecipientBranch = createSelector(selectGiftFeature, g => g.recipients);

// 3. Helpers

const { selectAll: selectHolidayArray, selectEntities: selectHolidayEntities } = fromHolidays.adapter.getSelectors(selectHolidaysBranch);
const { selectAll: selectRecipientArray } = fromRecipients.adapter.getSelectors(selectRecipientBranch);
const selectShowAll = createSelector(
  selectHolidayListControlsBranch,
  b => b.showAll
);
const selectSortBy = createSelector(
  selectHolidayListControlsBranch,
  b => b.sortBy
);
// 4. For the components

// 4.a We need one that returns a holiday model

const selectHolidayModelRaw = createSelector(selectHolidayArray,
  (holidays) => {
    return {
      holidays  // Note: Easy for now because they are the same.
    } as fromHolidayModels.HolidaysModel;
  }

);

const selectHolidayModelFiltered = createSelector(
  selectHolidayModelRaw,
  selectShowAll,
  (holidayModel, showAll) => {
    if (showAll) {
      return holidayModel;
    } else {
      return {
        holidays: holidayModel.holidays.filter(h => new Date(h.date) >= new Date())
      } as fromHolidayModels.HolidaysModel;
    }
  }
);

const selectHolidayListSorted = createSelector(
  selectHolidayModelFiltered,
  selectSortBy,
  (holiday, by) => {
    if (by === 'date') {
      return {
        holidays: [...holiday.holidays.sort(
          (lhs, rhs) => {
            if (new Date(lhs.date) < new Date(rhs.date)) {
              return -1;
            }
            if (new Date(lhs.date) > new Date(rhs.date)) {
              return 1;
            }
            return 0;
          }
        )]
      };
    } else {
      return {
        holidays: [...holiday.holidays.sort(
          (lhs, rhs) => {
            if (lhs.name.toLocaleLowerCase() < rhs.name.toLocaleLowerCase()) {
              return -1;
            }
            if (lhs.name.toLocaleLowerCase() > rhs.name.toLocaleLowerCase()) {
              return 1;
            }
            return 0;
          }
        )]
      };
    }
  }
);


export const selectHolidayListModel = createSelector(
  selectHolidayModelRaw,
  r => r.holidays // think about the filtering and sorting
);

export const selectHolidayModel = createSelector(
  selectHolidayListSorted,
  h => h
);


export const selectHolidayListControlsModel = createSelector(
  selectHolidayListControlsBranch,
  b => {
    return {
      showingAll: b.showAll,
      showingUpComing: !b.showAll,
      sortingByDate: b.sortBy === 'date',
      sortingByName: b.sortBy === 'name'
    } as fromHolidayListControlsModel.ListControlsModel;
  }
);


/* export const selectRecipientModel = createSelector(
  selectRecipientArray,
  selectHolidayEntities,
  (recipients, holidays) => {
    return recipients.map(recipient => {
      return {
        id: recipient.id,
        email: recipient.email
        name: recipient.name,
        holidays: recipient.selectedHolidayIds
          .map(id => holidays[id]).map(h => ({
            id: h.id,
            description: h.name + ' (' + moment(h.date).format('MMMM Do, YYYY') + ')'
          })) as fromRecipientModels.RecipientListModel;
      } as fromRecipientModels.RecipientListHolidayItemModel;
    });
  }
); */

export const selectRecipientModel = createSelector(
  selectRecipientArray,
  selectHolidayEntities,
  (recipients, holidays) => {
    return recipients.map(recipient => {
      return {
        id: recipient.id,
        email: recipient.email,
        name: recipient.name,
        holidays: recipient.selectedHolidayIds.map(id => holidays[id]).map(h => ({
          id: h.id,
          description: h.name + ' (' + moment(h.date).format('MMMM DD, YYYY') + ')'
        }))
      } as fromRecipientModels.RecipientListModel;
    });
  }
);
