import { Action } from '@ngrx/store';
import merge = require('lodash/merge');

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

export interface State{
  'ui.init':boolean
  'ui.current_url':string,
}

export const UI_INIT = 'UI_INIT';
export const CURRENT_ROUTE_URL = 'CURRENT_ROUTE_URL';

export function reducer(state:State, action: ActionWithPayload<any>):State{

    let _value = null;

    switch (action.type) {
        case CURRENT_ROUTE_URL:
          _value = merge({},state,{
            'ui.current_url':action.payload
          })
          return _value;

        case UI_INIT:
          _value = merge({},state,{
            'ui.init':true,
          });
          return _value;
    }
}
