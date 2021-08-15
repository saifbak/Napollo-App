import {
  OPEN_SONG_BOTTOM_SHEET,
  CLOSE_SONG_BOTTOM_SHEET,
} from '../constants/index';
import React, {useRef} from 'react';

export const openSongBottomSheetReducer = (
  state = {isSongBottomSheetOpen: false, songDetails: {}},
  {type, payload},
) => {
  switch (type) {
    case OPEN_SONG_BOTTOM_SHEET:
      return {
        isSongBottomSheetOpen: true,
        songDetails: payload,
      };
    case CLOSE_SONG_BOTTOM_SHEET:
      return {
        ...state,
        isSongBottomSheetOpen: false,
      };

    default:
      return state;
  }
};
