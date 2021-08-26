import {useSelector, useDispatch} from 'react-redux';
import React from 'react';
import {logout} from '../redux/actions/userActions';
import {LOGOUT_USER_WHEN_TOKEN_EXPIRES} from '../redux/constants';
import {callingCodes} from '../data5';

export const getLoggedInUserProfile = type => {
  const getUserProfile = useSelector(state => state.getUserProfile);
  const getArtistProfile = useSelector(state => state.getArtistProfile);

  if (type === 'LISTENER') {
    return getUserProfile;
  } else if (type === 'ARTIST') {
    return getArtistProfile;
  }
};

export const logoutUserWhenTokenExpires = (dispatch, error, type) => {
  console.log(error, 'MAIN ERROR FROM TOKE EXPIRES');
  if (
    error?.message ===
      'Invalid and/or expired access token. Please request a new access token' ||
    error?.response?.data.responseDescription ===
      'Invalid and/or expired access token. Please request a new access token'
  ) {
    dispatch(logout());
    dispatch({
      type: LOGOUT_USER_WHEN_TOKEN_EXPIRES,
      payload:
        'Invalid and/or expired access token. Please request a new access token',
    });
    dispatch({
      type: type,
      payload:
        error?.response && error?.response?.data?.responseDescription
          ? error?.response?.data?.responseDescription
          : error?.message,
    });
  } else {
    dispatch({
      type: type,
      payload:
        error?.response && error?.response?.data?.responseDescription
          ? error?.response?.data?.responseDescription
          : error?.message,
    });
  }
};

export const getUserCallingCode = val => {
  const res = callingCodes.filter(x => x.code === val);
  console.log(res[0].dial_code, 'CALLINGcODE');
  return res[0].dial_code;
};
