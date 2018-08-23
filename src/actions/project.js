import {
  SET_PROJECT_TOKEN_INFO,
  SET_PROJECT_TOKEN_NEWS,
  SET_DISPLAY_COLUMNS,
  SET_PROJECT_OPINIONS,
} from './types';
import moment from 'moment'

export function setProjectTokenInfo(data){
  return (dispatch) => {
    dispatch({type: SET_PROJECT_TOKEN_INFO, data});
  };
}

export function setProjectTokenNews(data){
  data = data.sort((time1, time2) => {
    // return time1.timestamp > time2.timestamp;
    const diff = moment(time1.timestamp).diff(moment(time2.timestamp), 'hours');
    if (diff > 0) return -1;
    else if (diff < 0) return 1;
    return 0;
  });
  return (dispatch) => {
    dispatch({type: SET_PROJECT_TOKEN_NEWS, data});
  };
}

export function setDisplayColumns(data){
  return (dispatch) => {
    dispatch({type: SET_DISPLAY_COLUMNS, data});
  };
}

export function setProjectOpinions(data) {
  return (dispatch) => {
    dispatch({type: SET_PROJECT_OPINIONS, data});
  }
}