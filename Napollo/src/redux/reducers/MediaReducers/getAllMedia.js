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
  CLEAR_POST_SONG,
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

export const getMediaReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case GET_MEDIA_LOADING:
      return {
        loading: true,
        error: '',
        data: [],
      };

    case GET_MEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
        error: '',
      };
    case GET_MEDIA_FAIL:
      return {
        ...state,
        loading: false,
        data: [],
        error: payload,
      };

    default:
      return state;
  }
};
export const getTrailerMediaReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case GET_TRAILER_MEDIA_LOADING:
      return {
        loading: true,
        error: '',
        data: [],
      };

    case GET_TRAILER_MEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
        error: '',
      };
    case GET_TRAILER_MEDIA_FAIL:
      return {
        ...state,
        loading: false,
        data: [],
        error: payload,
      };

    default:
      return state;
  }
};
export const getArtistMediaReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case GET_ALL_ARTIST_SONGS_LOADING:
      return {
        loading: true,
        error: '',
        data: [],
      };

    case GET_ALL_ARTIST_SONGS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
        error: '',
      };
    case GET_ALL_ARTIST_SONGS_FAIL:
      return {
        ...state,
        loading: false,
        data: [],
        error: payload,
      };

    default:
      return state;
  }
};

export const playMediaReducer = (
  state = {loading: false, error: '', message: '', status: false},
  {type, payload},
) => {
  switch (type) {
    case PLAY_MEDIA_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        message: '',
        status: false,
      };
    case PLAY_MEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        message: payload.responseDescription,
        status: payload.responseStatus,
      };
    case PLAY_MEDIA_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        message: '',
        status: '',
      };

    default:
      return state;
  }
};

export const getTrendingMediaReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case GET_TRENDING_MEDIA_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        data: [],
      };
    case GET_TRENDING_MEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case GET_TRENDING_MEDIA_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        data: [],
      };
    default:
      return state;
  }
};
export const getArtistTrendingMediaReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case GET_ARTIST_TRENDING_MEDIA_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        data: [],
      };
    case GET_ARTIST_TRENDING_MEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case GET_ARTIST_TRENDING_MEDIA_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        data: [],
      };
    default:
      return state;
  }
};
export const getUserMediaListeningHistoryReducer = (
  state = {loading: false, error: '', data: []},
  {type, payload},
) => {
  switch (type) {
    case GET_USER_MEDIA_LISTENING_HISTORY_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        data: [],
      };
    case GET_USER_MEDIA_LISTENING_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case GET_USER_MEDIA_LISTENING_HISTORY_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        data: [],
      };
    default:
      return state;
  }
};

export const addMediaToDiscoverPageReducer = (
  state = {loading: false, error: '', status: false, message: ''},
  {type, payload},
) => {
  switch (type) {
    case ADD_MEDIA_TO_DISCOVER_PAGE_LOADING:
      return {
        ...state,
        loading: true,
        error: '',
        status: false,
        message: '',
      };
    case ADD_MEDIA_TO_DISCOVER_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        status: payload.responseStatus,
        message: payload.responseDescription,
      };
    case ADD_MEDIA_TO_DISCOVER_PAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        status: false,
        message: '',
      };

    default:
      return state;
  }
};

export const choosePostSongReducer = (
  state = {
    mediaTitle: '',
    mediaIdentity: '',
    likeCount: null,
    hitCount: null,
    photoUrl: '',
    artist: '',
  },
  {type, payload},
) => {
  switch (type) {
    case CHOOSE_POST_SONG:
      return {
        mediaTitle: payload.title,
        mediaIdentity: payload.id,
        likeCount: payload.likes,
        hitCount: payload.hits,
        photoUrl: payload.image,
        artist: payload.artist,
      };

    case CLEAR_POST_SONG:
      return {
        mediaTitle: '',
        mediaIdentity: '',
        likeCount: null,
        hitCount: null,
        photoUrl: '',
      };

    default:
      return state;
  }
};
