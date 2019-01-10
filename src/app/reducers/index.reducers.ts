import { ActionReducerMap } from '@ngrx/store';

import * as uiReducer from './ui.reducer';

export interface State {
  ui: uiReducer.State,
};

export const reducers: ActionReducerMap<State> = {
  ui: uiReducer.reducer,
}
