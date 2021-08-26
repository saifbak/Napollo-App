import {
  CREATE_ALBUM_FAIL,
  CREATE_ALBUM_LOADING,
  CREATE_ALBUM_SUCCESS,
  GET_ALBUM_DETAILS_FAIL,
  GET_ALBUM_DETAILS_LOADING,
  GET_ALBUM_DETAILS_SUCCESS,
  GET_ALL_USER_ALBUM_FAIL,
  GET_ALL_USER_ALBUM_LOADING,
  GET_ALL_USER_ALBUM_SUCCESS,
  DELETE_ALBUM_SUCCESS,
  DELETE_ALBUM_FAIL,
  DELETE_ALBUM_LOADING,
  CLEAR_ALBUM_ERROR,
  CLEAR_ALBUM_FORM,
  CLEAR_ALL_USER_ALBUM_ON_LOGOUT,
  UPDATE_ALBUM_DETAILS_FAIL,
  UPDATE_ALBUM_DETAILS_LOADING,
  UPDATE_ALBUM_DETAILS_SUCCESS,
  CLEAR_UPDATE_ALBUM_DETAILS,
  STORE_ACTIVE_ALBUM_DETAILS,
} from '../../../constants/index';

import {BASE_URL2} from '@env';
import axios from 'axios';
import {saveDataToStorage} from '../../../../utils/asyncStorage';
import {Platform} from 'react-native';
import {logoutUserWhenTokenExpires} from '../../../../utils/loggedInUserType';

export const create_Album =
  (albumArt, fileType, name, description, year, page = 0, size = 50) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_ALBUM_LOADING,
      });
      console.log(fileType, 'FILETYPE');
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const data = new FormData();
      if (albumArt === '') {
        data.append('name', `${name}`);
        data.append('description', `${description}`);
        data.append('year', `${year}`);
      } else {
        data.append('albumArt', {
          uri: Platform.OS === 'android' ? `file://${albumArt}` : albumArt,
          type: fileType,
          name: 'albumArt',
        });
        data.append('name', `${name}`);
        data.append('description', `${description}`);
        data.append('year', `${year}`);
      }

      const config = {
        method: 'post',
        url: `${BASE_URL2}/album`,
        headers: {
          Authorization: authorization,
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };
      await axios(config)
        .then(res => {
          console.log(res, 'PICS RES');
          dispatch({
            type: CREATE_ALBUM_SUCCESS,
            payload: res.data,
          });
          dispatch(get_All_User_Album(page, size));
        })
        .catch(error => {
          logoutUserWhenTokenExpires(dispatch, error, CREATE_ALBUM_FAIL);
        });
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, CREATE_ALBUM_FAIL);
      //   dispatch({
      //     type: CREATE_ALBUM_FAIL,
      //     payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };

export const get_Album_Detail = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALBUM_DETAILS_LOADING,
    });
    const token = getState().userLogin.token;
    const authorization = `Bearer ${token}`;
    const config = {
      headers: {
        Authorization: authorization,
      },
    };
    const {data} = await axios.get(`${BASE_URL2}/album/${id}`, config);
    dispatch({
      type: GET_PLAYLIST_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    logoutUserWhenTokenExpires(dispatch, error, GET_ALBUM_DETAILS_FAIL);
    //     dispatch({
    //     type: GET_ALBUM_DETAILS_FAIL,
    //     payload:
    //     error.response && error.response.data.responseDescription
    //       ? error.response.data.responseDescription
    //       : error.message,
    // });
  }
};

export const get_All_User_Album =
  (page, size) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_ALL_USER_ALBUM_LOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: authorization,
        },
        params: {
          page,
          size,
        },
      };

      const {data} = await axios.get(`${BASE_URL2}/albums`, config);
      dispatch({
        type: GET_ALL_USER_ALBUM_SUCCESS,
        payload: data.responseBody.content,
      });
      saveDataToStorage('artistAlbums', data.responseBody.content);
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, GET_ALL_USER_ALBUM_FAIL);
      //    dispatch({
      //     type: GET_ALL_USER_ALBUM_FAIL,
      //     payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };

export const delete_Album = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_ALBUM_LOADING,
    });
    const token = getState().userLogin.token;
    const authorization = `Bearer ${token}`;
    const config = {
      headers: {
        Authorization: authorization,
      },
    };

    const {data} = await axios.delete(`${BASE_URL2}/album/${id}`, config);
    dispatch({
      type: DELETE_ALBUM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    logoutUserWhenTokenExpires(dispatch, error, DELETE_ALBUM_FAIL);
    // dispatch({
    //   type: DELETE_PLAYLIST_FAIL,
    //   payload:
    //     error.response && error.response.data.description
    //       ? error.response.data.description
    //       : error.message,
    // });
  }
};

export const update_Playlist_Details =
  (albumArt, fileType, name, description, year) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_ALBUM_DETAILS_LOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const data = new FormData();
      data.append('albumArt', {
        uri: Platform.OS === 'android' ? `file://${albumArt}` : albumArt,
        type: fileType,
        name: 'albumArt',
      });
      data.append('name', `${name}`);
      data.append('description', `${description}`);
      data.append('year', `${year}`);

      const config = {
        method: 'put',
        url: `${BASE_URL2}/album/${id}`,
        headers: {
          Authorization: authorization,
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };

      await axios(config)
        .then(res => {
          dispatch({
            type: UPDATE_ALBUM_DETAILS_SUCCESS,
            payload: res.data,
          });
        })
        .catch(error => {
          logoutUserWhenTokenExpires(
            dispatch,
            error,
            UPDATE_ALBUM_DETAILS_FAIL,
          );
          // dispatch({
          //   type: UPDATE_PLAYLIST_DETAILS_FAIL,
          //   payload:
          //     error.response && error.response.data.responseDescription
          //       ? error.response.data.responseDescription
          //       : error.message,
          // });
        });
    } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, UPDATE_ALBUM_DETAILS_FAIL);
      // dispatch({
      //   type: UPDATE_PLAYLIST_DETAILS_FAIL,
      //   payload:
      //     error.response && error.response.data.description
      //       ? error.response.data.description
      //       : error.message,
      // });
    }
  };

export const store_Active_Album_Details = data => {
  return {
    type: STORE_ACTIVE_ALBUM_DETAILS,
    payload: data,
  };
};
