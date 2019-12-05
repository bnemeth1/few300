import * as fromErrors from './errors.reducer';
import * as fromUser from './user.reducer';
import { createSelector } from '@ngrx/store';

export interface AppState {
  errors: fromErrors.ErrorState;
  user: fromUser.UserState;
}

export const reducers = {
  errors: fromErrors.reducer,
  user: fromUser.reducer
};

// Selectors

// 1. Feature selector (we arent in a feature !!!)

// 2. Selector per branch

const selectErrorBranch = (state: AppState) => state.errors;
const selectUserBranch = (state: AppState) => state.user;

// 3. Helpers

// 4. For the components

// Hint you need a couple.  one to tell if there is an error, the other for the message

export const selectHasError = createSelector(
  selectErrorBranch,
  (e) => e.hasError
);

export const selectMessage = createSelector(
  selectErrorBranch,
  (e) => e.errorMessage
);

export const selectUserIsAdmin = createSelector(
  selectUserBranch,
  (u) => u.isAdmin
);

