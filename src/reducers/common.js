import defaultState from './defaultState';
import { SET_DISPLAY_COLUMNS, CLEAR_USER_INFORMATION } from '../actions/types';

export const graphTimePeriods = (state = defaultState.graphTimePeriods, action) => {
  return state;
};

export const currencyColumns = (state = defaultState.currencyColumns, action) => {
  return state;
};

export const allRanks = (state = defaultState.allRanks, action) => {
  return state;
};

export const exchangeConnections = (state = defaultState.exchangeConnections, action) => {
  return state;
};

export const selectedCurrencyColumns = (state = defaultState.selectedCurrencyColumns, action) => {
  switch (action.type) {
    case SET_DISPLAY_COLUMNS:
      return action.data;
    case CLEAR_USER_INFORMATION:
      return defaultState.selectedCurrencyColumns;
    default:
      return state;
  }
};