import {
  OPEN_SONG_BOTTOM_SHEET,
  CLOSE_SONG_BOTTOM_SHEET,
} from '../constants/index';


export const openSongBottomSheetView = (data) => {
  console.log('BottomSheet Opened');
  
  return {
    type: OPEN_SONG_BOTTOM_SHEET,
    payload: data,
  };
};
export const closeSongBottomSheetView = () => {
  console.log('BottomSheet Closed');
  return {
    type: CLOSE_SONG_BOTTOM_SHEET,
  };
};
