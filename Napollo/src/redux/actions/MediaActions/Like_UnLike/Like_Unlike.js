import {
  LIKE_MEDIA_FAIL,
  LIKE_MEDIA_SUCCESS,
  LIKE_MEDIA_lOADING,
  UNLIKE_MEDIA_FAIL,
  UNLIKE_MEDIA_SUCCESS,
  UNLIKE_MEDIA_lOADING,
  ADD_MEDIA_TO_LIKED_LIST,
  REMOVE_MEDIA_FROM_LIKED_LIST,
} from '../../../constants/index';
import {BASE_URL2} from '@env';
import axios from 'axios';
import {logoutUserWhenTokenExpires} from '../../../../utils/loggedInUserType';

import axiosInstance from '../../../../utils/axiosInstance';

export const likeMedia =
  (id, state = true) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: LIKE_MEDIA_lOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const config = {
        params: {
          state,
        },
        headers: {
          Authorization: authorization,
        },
      };

      const {data} = await axios.get(`${BASE_URL2}/media/${id}/like`, config);

      dispatch({
        type: LIKE_MEDIA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, LIKE_MEDIA_FAIL);
      // dispatch({
      //   type: LIKE_MEDIA_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };

export const unLikeMedia =
  (id, state = false) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: UNLIKE_MEDIA_lOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: authorization,
        },
        params: {
          state,
        },
      };

      const {data} = await axios.get(`${BASE_URL2}/media/${id}/like`, config);

      dispatch({
        type: UNLIKE_MEDIA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, UNLIKE_MEDIA_FAIL);
      // dispatch({
      //   type: UNLIKE_MEDIA_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };

export const addToLikedList = id => {
  return {
    type: ADD_MEDIA_TO_LIKED_LIST,
    payload: id,
  };
};
export const removeFromLikedList = id => {
  return {
    type: REMOVE_MEDIA_FROM_LIKED_LIST,
    payload: id,
  };
};
