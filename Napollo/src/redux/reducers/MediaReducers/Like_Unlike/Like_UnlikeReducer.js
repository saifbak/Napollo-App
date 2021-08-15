import {
  LIKE_MEDIA_FAIL,
  LIKE_MEDIA_SUCCESS,
  LIKE_MEDIA_lOADING,
  UNLIKE_MEDIA_FAIL,
  UNLIKE_MEDIA_SUCCESS,
  UNLIKE_MEDIA_lOADING,
} from '../../../constants/index';

export const LikeMediaReducer = (
  state = {loading: false, error: null, status: null, message: ''},
  {type, payload},
) => {
  switch (type) {
    case LIKE_MEDIA_lOADING:
      return {
        loading: true,
      };
    case LIKE_MEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        status: payload.responseStatus,
        message: payload.responseDescription,
      };
    case LIKE_MEDIA_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        status: null,
        message: '',
      };

    default:
      return state;
  }
};

export const UnLikeMediaReducer = (
  state = {loading: false, error: null, status: null, message: ''},
  {type, payload},
) => {
  switch (type) {
    case UNLIKE_MEDIA_lOADING:
      return {
        loading: true,
      };
    case UNLIKE_MEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        status: payload.responseStatus,
        message: payload.responseMessage,
      };
    case UNLIKE_MEDIA_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        status: null,
        message: '',
      };

    default:
      return state;
  }
};
