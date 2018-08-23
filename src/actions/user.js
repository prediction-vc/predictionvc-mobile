import { SET_USER_PROFILE, CLEAR_USER_INFORMATION } from './types';

export function setUserProfile(profile){
  return (dispatch) => {
    dispatch({type: SET_USER_PROFILE, data: profile});
  };
}

export function clearUserInformation(profile){
  return (dispatch) => {
    dispatch({type: CLEAR_USER_INFORMATION});
  };
}