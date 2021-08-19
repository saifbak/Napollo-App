import {
  LIKE_MEDIA_FAIL,
  LIKE_MEDIA_SUCCESS,
  LIKE_MEDIA_lOADING,
  UNLIKE_MEDIA_FAIL,
  UNLIKE_MEDIA_SUCCESS,
  UNLIKE_MEDIA_lOADING,
} from '../../../constants/index';
import {logoutUserWhenTokenExpires} from '../../../../utils/loggedInUserType';

import axiosInstance from '../../../../utils/axiosInstance';

export const likeMedia = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIKE_MEDIA_lOADING,
    });
    const token = getState().userLogin.token;
    const authorization = `Bearer ${token}`;
    const config = {
      params: {
        status: true,
      },
      headers: {
        Authorization: authorization,
      },
    };

    const {data} = await axiosInstance.get(`/media/${id}/like`, {
      headers: {
        Authorization: authorization,
      },
      params: {
        status: true,
      },
    });

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

export const unLikeMedia = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UNLIKE_MEDIA_lOADING,
    });
    const token = getState().userLogin.token;
    const authorization = `Bearer ${token}`;
    const config = {
      params: {
        status: false,
      },
      headers: {
        Authorization: authorization,
      },
    };

    const {data} = await axiosInstance.get(`/media/${id}/like`, {
      headers: {
        Authorization: authorization,
      },
      params: {
        status: false,
      },
    });

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
