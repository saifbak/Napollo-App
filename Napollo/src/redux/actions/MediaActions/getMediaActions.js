import {
  GET_MEDIA_FAIL,
  GET_MEDIA_LOADING,
  GET_MEDIA_SUCCESS,
  GET_TRAILER_MEDIA_FAIL,
  GET_TRAILER_MEDIA_LOADING,
  GET_TRAILER_MEDIA_SUCCESS,
  GET_ALL_ARTIST_SONGS_FAIL,
  GET_ALL_ARTIST_SONGS_LOADING,
  GET_ALL_ARTIST_SONGS_SUCCESS,
  CHOOSE_POST_SONG,
  PLAY_MEDIA_FAIL,
  PLAY_MEDIA_LOADING,
  PLAY_MEDIA_SUCCESS,
  GET_TRENDING_MEDIA_FAIL,
  GET_TRENDING_MEDIA_LOADING,
  GET_TRENDING_MEDIA_SUCCESS,
  GET_ARTIST_TRENDING_MEDIA_FAIL,
  GET_ARTIST_TRENDING_MEDIA_LOADING,
  GET_ARTIST_TRENDING_MEDIA_SUCCESS,
  GET_USER_MEDIA_LISTENING_HISTORY_FAIL,
  GET_USER_MEDIA_LISTENING_HISTORY_LOADING,
  GET_USER_MEDIA_LISTENING_HISTORY_SUCCESS,
  ADD_MEDIA_TO_DISCOVER_PAGE_FAIL,
  ADD_MEDIA_TO_DISCOVER_PAGE_LOADING,
  ADD_MEDIA_TO_DISCOVER_PAGE_SUCCESS,
} from '../../constants/index';
import {BASE_URL2} from '@env';
import axios from 'axios';
import {logoutUserWhenTokenExpires} from '../../../utils/loggedInUserType'

export const get_Media = (page, size) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_MEDIA_LOADING,
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
    const {data} = await axios.get(`${BASE_URL2}/medias`, config);

    dispatch({
      type: GET_MEDIA_SUCCESS,
      payload: data.responseBody.content,
    });
  } catch (error) {
    logoutUserWhenTokenExpires(dispatch, error, GET_MEDIA_FAIL);
    // dispatch({
    //   type: GET_MEDIA_FAIL,
    //   payload:
    //     error.response && error.response.data.responseDescription
    //       ? error.response.data.responseDescription
    //       : error.message,
    // });
  }
};
export const get_Trailer_Media = (page, size) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_TRAILER_MEDIA_LOADING,
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
    const {data} = await axios.get(`${BASE_URL2}/media/discover`, config);

    dispatch({
      type: GET_TRAILER_MEDIA_SUCCESS,
      payload: data.responseBody.content,
    });
  } catch (error) {
    logoutUserWhenTokenExpires(dispatch, error, GET_TRAILER_MEDIA_FAIL);
    // dispatch({
    //   type: GET_TRAILER_MEDIA_FAIL,
    //   payload:
    //     error.response && error.response.data.responseDescription
    //       ? error.response.data.responseDescription
    //       : error.message,
    // });
  }
};

export const add_Media_To_Discover_Page =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_MEDIA_TO_DISCOVER_PAGE_LOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: authorization,
        },
        params: {
          id,
        },
      };

      const res = await axios.post(`${BASE_URL2}/media/discover`);
      dispatch({
        type: ADD_MEDIA_TO_DISCOVER_PAGE_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
       logoutUserWhenTokenExpires(
         dispatch,
         error,
         ADD_MEDIA_TO_DISCOVER_PAGE_FAIL,
       );
      // dispatch({
      //   type: ADD_MEDIA_TO_DISCOVER_PAGE_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };

export const get_Artist_Media = (page, size) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_ARTIST_SONGS_LOADING,
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
    const {data} = await axios.get(`${BASE_URL2}/media/accountuser`, config);

    dispatch({
      type: GET_ALL_ARTIST_SONGS_SUCCESS,
      payload: data.responseBody.content,
    });
  } catch (error) {
      logoutUserWhenTokenExpires(dispatch, error, GET_ALL_ARTIST_SONGS_FAIL);
    // dispatch({
    //   type: GET_ALL_ARTIST_SONGS_FAIL,
    //   payload:
    //     error.response && error.response.data.responseDescription
    //       ? error.response.data.responseDescription
    //       : error.message,
    // });
  }
};

export const play_Media =
  (city, state, country, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PLAY_MEDIA_LOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: authorization,
        },
      };
      const res = await axios.post(
        `${BASE_URL2}/media/${id}/play`,
        {
          city,
          state,
          country,
        },
        config,
      );
      dispatch({
        type: PLAY_MEDIA_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
       logoutUserWhenTokenExpires(dispatch, error, PLAY_MEDIA_FAIL);
      // dispatch({
      //   type: PLAY_MEDIA_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };

export const get_Trending_Media =
  (page, size, city, state, country) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_TRENDING_MEDIA_LOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: authorization,
        },
        params: {
          city,
          state,
          country,
          page,
          size,
        },
      };

      const res = await axios.get(`${BASE_URL2}/media/trending`, config);

      dispatch({
        type: GET_TRENDING_MEDIA_SUCCESS,
        payload: res.data.responseBody.content,
      });
    } catch (error) {
      console.log(error, ' TRENDING MEDIA');
      logoutUserWhenTokenExpires(dispatch, error, GET_TRENDING_MEDIA_FAIL);
      // dispatch({
      //   type: GET_TRENDING_MEDIA_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };
export const get_Artist_Trending =
  (city, state, country, page, size) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_ARTIST_TRENDING_MEDIA_LOADING,
      });
      const token = getState().userLogin.token;
      const authorization = `Bearer ${token}`;
      const config = {
        headers: {
          Authorization: authorization,
        },
        params: {
          city,
          state,
          country,
          page,
          size,
        },
      };

      const res = await axios.get(
        `${BASE_URL2}/media/trending/accountuser`,
        config,
      );

      dispatch({
        type: GET_ARTIST_TRENDING_MEDIA_SUCCESS,
        payload: res.data.responseBody.content,
      });
    } catch (error) {
      logoutUserWhenTokenExpires(
        dispatch,
        error,
        GET_ARTIST_TRENDING_MEDIA_FAIL,
      );
      // dispatch({
      //   type: GET_ARTIST_TRENDING_MEDIA_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };
export const get_User_Media_Listening_History =
  (page, size) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_USER_MEDIA_LISTENING_HISTORY_LOADING,
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
      const res = await axios.get(
        `${BASE_URL2}/media/accountuser/history`,
        config,
      );
      console.log(res, 'HISTORY RES');

      dispatch({
        type: GET_USER_MEDIA_LISTENING_HISTORY_SUCCESS,
        payload: res.data.responseBody.content,
      });
    } catch (error) {
      logoutUserWhenTokenExpires(
        dispatch,
        error,
        GET_USER_MEDIA_LISTENING_HISTORY_FAIL,
      );
      // dispatch({
      //   type: GET_USER_MEDIA_LISTENING_HISTORY_FAIL,
      //   payload:
      //     error.response && error.response.data.responseDescription
      //       ? error.response.data.responseDescription
      //       : error.message,
      // });
    }
  };

export const choose_Post_Song = (data) => {
  return {
    type: CHOOSE_POST_SONG,
    payload: data,
  };
};
