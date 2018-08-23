import defaultState from './defaultState';
import { SET_USER_PROFILE, CLEAR_USER_INFORMATION } from '../actions/types';

export const user = (state = defaultState.user, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...action.data
      };
    case CLEAR_USER_INFORMATION:
      return defaultState.user;
    default:
      return state;
  }
};