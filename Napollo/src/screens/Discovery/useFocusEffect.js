import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {
  get_Media,
  get_Trailer_Media,
  increase_Discover_Media_Page,
  increase_Discover_Media_Size,
} from '../../redux/actions/MediaActions/getMediaActions';
import {usePlayerContext} from '../../PlayerContext/PlayerContext';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  RepeatMode,
} from 'react-native-track-player';
import Data from 'city-state-country';
import {CLEAR_TRAILER_MEDIA_ERROR} from '../../redux/constants';

const FocusEffect = ({page, size, unLike, chooseState, countryCode}) => {
  const [currentTrack, setCurrentTrack] = useState('');
  const dispatch = useDispatch();
  const {play, resetCurrentTrack} = usePlayerContext();
  const getTrailerMedia = useSelector(state => state.getTrailerMedia);
  const increaseCurrentDiscoverPage = useSelector(
    state => state.increaseCurrentDiscoverPage,
  );
  const {page: currentPage} = increaseCurrentDiscoverPage;
  const increaseCurrentDiscoverSize = useSelector(
    state => state.increaseCurrentDiscoverSize,
  );
  const {size: currentSize} = increaseCurrentDiscoverSize;

  const {data, loading, error} = getTrailerMedia;

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

  useEffect(() => {
    dispatch(get_Trailer_Media(currentPage, currentSize));
    if (data && data !== [] && loading !== false) {
      const newData = data.every(item => {
        item.url = item.trailer;
      });
      play(newData);
    }
  }, []);

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackQueueEnded],
    async event => {
      if (
        event.type === Event.PlaybackTrackChanged &&
        event.nextTrack != null
      ) {
        TrackPlayer.setRepeatMode(RepeatMode.Track);
      }
      if (event.type === Event.PlaybackQueueEnded && event.nextTrack == null) {
        dispatch(increaseCurrentDiscoverPage);
        dispatch(get_Trailer_Media(currentPage, currentSize));
        if (data && data.length <= 0 && loading !== false) {
          const newData = data.every(item => {
            item.url = item.trailer;
          });
          play(newData);
        }
      }
    },
  );

  // useTrackPlayerEvents([])

  useEffect(() => {
    dispatch(increaseCurrentDiscoverPage);
    dispatch(get_Trailer_Media(currentPage, currentSize));
    if (data && data.length <= 0 && loading !== false) {
      const newData = data.every(item => {
        item.url = item.trailer;
      });
      play(newData);
    }
  }, [data]);

  useFocusEffect(
    React.useCallback(() => {
      // TrackPlayer.reset();
      resetCurrentTrack();
      dispatch({type: CLEAR_TRAILER_MEDIA_ERROR});
      return async () => TrackPlayer.reset();
    }, [data]),
  );
  return null;
};

export default FocusEffect;
