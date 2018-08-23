import defaultState from './defaultState';
import { SET_PROJECT_TOKEN_INFO, SET_PROJECT_TOKEN_NEWS, CLEAR_USER_INFORMATION, SET_PROJECT_OPINIONS } from '../actions/types';

export const project = (state = defaultState.project, action) => {
  switch (action.type) {
    case SET_PROJECT_TOKEN_INFO:
      return {
        ...state,
        tokenInformation: action.data,
      };
    case SET_PROJECT_TOKEN_NEWS:
      return {
        ...state,
        news: action.data,
      };
    case SET_PROJECT_OPINIONS:
      return {
        ...state,
        opinions: action.data
      };
    case CLEAR_USER_INFORMATION:
      return defaultState.project;
    default:
      return state;
  }
};
