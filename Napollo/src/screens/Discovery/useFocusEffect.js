import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {
  get_Media,
  get_Trailer_Media,
} from '../../redux/actions/MediaActions/getMediaActions';
import {usePlayerContext} from '../../PlayerContext/PlayerContext';
import TrackPlayer from 'react-native-track-player';
import Data from 'city-state-country';

const FocusEffect = ({page, size, unLike, chooseState, countryCode}) => {
  const [currentTrack, setCurrentTrack] = useState('');
  const dispatch = useDispatch();
  const {play} = usePlayerContext();
  const getTrailerMedia = useSelector((state) => state.getTrailerMedia);
  const {data} = getTrailerMedia;

  // React.useEffect(() => {
  //   const Listener = TrackPlayer.addEventListener(
  //     'playback-track-changed',
  //     async ({track, position, nextTrack}) => {
  //       setCurrentTrack(nextTrack);
  //       if (currentTrack !== '') {
  //         if (currentTrack !== nextTrack) {
  //         }
  //       }
  //     },
  //   );
  //   return () => {
  //     Listener.remove();
  //   };
  // }, []);
 
  useFocusEffect(
    React.useCallback(() => {
      // TrackPlayer.reset(); 
      dispatch(get_Trailer_Media(page, size));
      if (data !== []) {
        data.forEach(function (obj) {
          obj.id = obj.mediaIdentity;
          obj.url = obj.trailerUrl;
          Object.preventExtensions(obj);
        });
      }
      play(data);

      return async () => TrackPlayer.reset();
    }, []),
  );
  return null;
};

export default FocusEffect;
