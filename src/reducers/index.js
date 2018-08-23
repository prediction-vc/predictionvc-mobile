import { combineReducers } from 'redux';
import { user} from './user';
import { project } from './project';
import {
  graphTimePeriods,
  currencyColumns,
  selectedCurrencyColumns,
  allRanks,
  exchangeConnections,
} from './common';

export default combineReducers({
  user,
  project,
  graphTimePeriods,
  currencyColumns,
  selectedCurrencyColumns,
  allRanks,
  exchangeConnections,
});
