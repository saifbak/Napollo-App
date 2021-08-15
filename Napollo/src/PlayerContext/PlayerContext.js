import React, {useContext, useCallback, useRef} from 'react';
import {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import TrackPlayer, {
  STATE_BUFFERING,
  STATE_NONE,
  STATE_PAUSED,
  STATE_PLAYING,
  STATE_READY,
  STATE_STOPPED,
  Track,
  useTrackPlayerProgress,
  usePlaybackState,
} from 'react-native-track-player';
import {useDispatch, useSelector} from 'react-redux';
import {shuffleSongs} from '../redux/actions/musicPlayerActions';
import {play_Media} from '../redux/actions/MediaActions/getMediaActions';

// const {} = useTrackPlayerProgress

const PlayerContext = React.createContext({
  isPlaying: false,
  isPaused: false,
  isStopped: false,
  isEmpty: false,
  isBuffering: false,
  currentTrack: null,
  isMusicPlaying: false,
  istrimTrackPlaying: false,
  isMusicPaused: false,
  istrimTrackPaused: false,
  isMusicEmpty: false,
  istrimTrackEmpty: false,
  isMusicStopped: false,
  istrimTrackStopped: false,
  isMusicBuffering: false,
  istrimTrackBuffering: false,
  currentMusicTrack: null,
  currentIndex: 0,
  play: () => null,
  pause: () => null,
  setPlayerStateReady: () => null,
  skip: () => null,
  isPlayerReady: false,
  trimPlay: () => null,
  playMusic: () => null,
  skipToNextMusic: () => null,
  skipToPreviousMusic: () => null,
  musicPause: () => null,
  musicPlay: () => null,
  bottomRef: null,
  getSongs: () => null,
  currentTrackId: '',
  currentTrackDetails: {},
  currentDiscoveryTrack: [],
  resetTrack: () => null,
  changeToShuffle: () => null,
  changeToOrder: () => null,
  shuffleState: false,
  changeToRepeatOff: () => null,
  changeToRepeatOn: () => null,
  repeatState: false,
});

export const PlayerContextProvider = ({children}) => {
  const [playerState, setPlayerState] = useState(null);
  const [musicPlayerState, setMusicPlayerState] = useState(null);
  const [trimTrackState, setTrimTrackState] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTrimTrack, setCurrentTrimTrack] = useState(null);
  const [currentQueue, setCurrentQueue] = useState([]);
  const [currentDiscoveryTrackId, setDiscoveryTrackId] = useState('');
  const [currentDiscoveryTrack, setCurrentDiscoveryTrack] = useState([]);
  const [currentMusicTrack, setCurrentMusicTrack] = useState(null);
  const [isPlayerReady, setPlayerReady] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState('');
  const [currentTrackDetails, setCurrentTrackDetails] = useState({});
  const [shuffleState, setShuffleState] = useState('Order mode');
  const [repeatState, setRepeatState] = useState('Repeat Off');

  const bottomRef = useRef(null);
  const dispatch = useDispatch();
  const openMusicPlayer = useSelector(state => state.openMusicPlayer);
  const {data} = openMusicPlayer;
  const storeUserLocation = useSelector(state => state.storeUserLocation);
  const {city, state, country} = storeUserLocation;

  useEffect(() => {
    console.log('adding listener');
    const Listener1 = TrackPlayer.addEventListener(
      'playback-state',
      ({state}) => {
        // console.log('state changed', state);
        setPlayerState(state),
          setMusicPlayerState(state),
          setTrimTrackState(state);
      },
    );

    return () => {
      Listener1.remove();
    };
  }, []);
  // useEffect(() => {
  //   const Listener2 = TrackPlayer.addEventListener(
  //     'playback-state',
  //     ({state}) => setMusicPlayerState(state),
  //     console.log('listner1'),
  //   );

  //   return () => {
  //     Listener2.remove();
  //   };
  // }, []);
  // useEffect(() => {
  //   const Listener3 = TrackPlayer.addEventListener(
  //     'playback-state',
  //     ({state}) => setTrimTrackState(state),
  //     console.log('Trim Track listner'),
  //   );

  //   return () => {
  //     Listener3.remove();
  //   };
  // }, []);

  useEffect(() => {
    const Listener = TrackPlayer.addEventListener(
      'playback-track-changed',
      async ({track, position, nextTrack}) => {
        // console.log(nextTrack, 'NEXT mUSIC TRACK not playing CHANGED');
        const trackObject = await TrackPlayer.getTrack(nextTrack);
        // const trackQueue = await TrackPlayer.getQueue(nextTrack);
        const trackQueue = await TrackPlayer.getQueue();
        if (trackObject) {
          if (trackObject.ownerAccountUser) {
            const newObject = {
              ...trackObject,
              artist: trackObject.ownerAccountUser.username,
            };
            console.log('trackObject', newObject);
            dispatch(play_Media(city, state, country, trackObject.id));
            setCurrentMusicTrack(newObject);
            setCurrentTrackDetails(newObject);
          } else {
            console.log('trackObject', trackObject);
            dispatch(play_Media(city, state, country, trackObject.id));
            setCurrentMusicTrack(trackObject);
            setCurrentTrackDetails(trackObject);
          }

          // setCurrentTrackId(nextTrack);
        }
        if (trackQueue) {
          // console.log(trackQueue, 'TRACK QUEUE WHEN SONG CHANGE');
          setCurrentQueue(trackQueue);
          await TrackPlayer.play();
        }
      },
    );
    return () => {
      Listener.remove();
    };
  }, []);
  // const shuffleTrack = async () => {
  //   // const getQueue = await TrackPlayer.getQueue();
  //   dispatch(shuffleSongs(currentQueue));
  //   if (shuffleState === 'Shuffle mode') {
  //     console.log(currentQueue, 'SHUFFLE MODE queue');

  //     TrackPlayer.removeUpcomingTracks();
  //     console.log(data, 'DATA FROM SHUFFLINGgggggg');
  //     if (data !== []) {
  //       setCurrentQueue(data);
  //       await TrackPlayer.add(data);
  //       // await TrackPlayer.play();
  //       // setCurrentTrackDetails(data[0]);
  //     }
  //     // musicPlay(newSong);
  //   }
  // };

  // useEffect(() => {
  //   shuffleTrack();
  //   const Listener = TrackPlayer.addEventListener(
  //     'playback-queue-ended',
  //     async ({track, position, nextTrack}) => {
  //       console.log(nextTrack, 'TRACK ENDED');

  //       if (shuffleState === 'Shuffle mode' && currentQueue !== []) {
  //         playMusic(currentQueue);
  //       }
  //       return () => {
  //         Listener.remove();
  //       };
  //     },
  //   );
  // }, [shuffleState]);

  const play = useCallback(
    async track => {
      await TrackPlayer.reset();
      setCurrentMusicTrack(null);
      if (!track) {
        if (currentTrack) {
          await TrackPlayer.play();
        }
        return;
      }
      if (track.id && currentTrack) {
        if (track.id && currentTrack !== currentTrack.id) {
          await TrackPlayer.reset();
        }
      }
      // if (Platform.OS === 'ios') {

      //   const data = [...track];
      //   data.forEach((i) => {
      //     i.artist = i.artists;
      //     i.url = `${i.url}.mp3`;
      //   });

      //   await TrackPlayer.add([...data]);
      // } else {
      //   await TrackPlayer.add([...track]);
      // }
      setCurrentTrack(track);
      await TrackPlayer.add([...track]);
      if (currentTrack) {
        await TrackPlayer.play();
      }
      setCurrentDiscoveryTrack(track);
      // console.log(currentDiscoveryTrack, 'DISCOVERY TRACK');
    },
    [currentTrack],
  );

  const playMusic = useCallback(
    async (track, index) => {
      await TrackPlayer.reset();
      // console.log(track, 'tracktrack')
      if (!track) {
        if (currentMusicTrack) {
          await TrackPlayer.play();
        }
        return;
      }
      if (track.id && currentMusicTrack) {
        if (track.id && currentMusicTrack !== currentMusicTrack.id) {
          await TrackPlayer.reset();
        }
      }
      await TrackPlayer.add([...track]);
      // await TrackPlayer.skip(index)
      setCurrentMusicTrack(...track);
      if (currentMusicTrack) {
        // await TrackPlayer.play(song);
        await TrackPlayer.play();
      }
      const trackId = await TrackPlayer.getCurrentTrack();
      if (trackId) {
        const trackObject = await TrackPlayer.getTrack(trackId);
        setCurrentTrackDetails(trackObject);
        setCurrentTrackId(trackId);
        // console.log(trackId, 'CurrentTrackId FROM PLAY ');
        // console.log(trackObject, 'CurrentTrackDetails FROM PLAY ');
      }

      // console.log(currentMusicTrack, 'CURRENTSTRACKS');
    },
    [currentMusicTrack],
  );

  const trimPlay = useCallback(async track => {
    await TrackPlayer.reset();

    if (!track) {
      if (currentTrimTrack) {
        await TrackPlayer.play();
      }
      return;
    }
    if (track.id && currentTrimTrack) {
      if (track.id && currentTrimTrack !== currentTrimTrack.id) {
        await TrackPlayer.reset();
      }
    }
    // if (Platform.OS === 'ios') {

    //   const data = [track];
    //   data.forEach((i) => {
    //     i.artist = i.artists;
    //     i.url = `${i.url}.mp3`;
    //   });

    //   await TrackPlayer.add([...data]);
    // } else {
    //   await TrackPlayer.add([track]);
    // }
    await TrackPlayer.add([track]);
    setCurrentTrimTrack(track);
    if (currentTrack) {
      await TrackPlayer.play();
    }
    setCurrentTrimTrackDetails(track);
  }, []);
  const pause = async () => {
    await TrackPlayer.pause();
  };
  const musicPlay = async () => {
    await TrackPlayer.play();
  };
  const musicPause = async () => {
    await TrackPlayer.pause();
  };
  const skip = async id => {
    await TrackPlayer.skip(id);
  };
  const skipToNextMusic = async () => {
    await TrackPlayer.skipToNext();
    const trackId = await TrackPlayer.getCurrentTrack();
    const trackObject = await TrackPlayer.getTrack(trackId);
    setCurrentTrackDetails(trackObject);
    setCurrentTrackId(trackId);
    // console.log(trackId, 'CurrentTrackId');
    // console.log(currentTrackDetails, 'CurrentTrackId');
  };
  const skipToPreviousMusic = async () => {
    await TrackPlayer.skipToPrevious();
    const trackId = await TrackPlayer.getCurrentTrack();
    const trackObject = await TrackPlayer.getTrack(trackId);
    setCurrentTrackDetails(trackObject);
    setCurrentTrackId(trackId);
    // console.log(trackId, 'CurrentTrackId');
    // console.log(currentTrackDetails, 'CurrentTrackId');
  };
  const setPlayerStateReady = () => {
    setPlayerReady(true);
  };
  const changeToShuffle = () => {
    setShuffleState('Shuffle mode');
  };
  const changeToOrder = () => {
    setShuffleState('Order mode');
  };
  const changeToRepeatOff = () => {
    setRepeatState('Repeat On');
  };
  const changeToRepeatOn = () => {
    setRepeatState('Repeat Off');
  };

  const getSongs = async () => {
    const tracks = await TrackPlayer.getQueue();
    return tracks;
  };
  const resetTrack = async () => {
    await TrackPlayer.reset();
  };

  const value = {
    isPlaying: playerState == STATE_PLAYING,
    isPaused: playerState === STATE_PAUSED,
    isEmpty: playerState === STATE_NONE,
    isStopped: playerState === STATE_STOPPED,
    isBuffering: playerState === STATE_BUFFERING,
    currentTrack,
    isPlayerReady,
    currentMusicTrack,
    isMusicPlaying: musicPlayerState == STATE_PLAYING,
    isMusicPaused: musicPlayerState === STATE_PAUSED,
    isMusicEmpty: musicPlayerState === STATE_NONE,
    isMusicStopped: musicPlayerState === STATE_STOPPED,
    isMusicBuffering: musicPlayerState === STATE_BUFFERING,
    isTrimTrackPlaying: trimTrackState == STATE_PLAYING,
    isTrimTrackPaused: trimTrackState === STATE_PAUSED,
    isTrimTrackEmpty: trimTrackState === STATE_NONE,
    isTrimTrackStopped: trimTrackState === STATE_STOPPED,
    isTrimTrackBuffering: trimTrackState === STATE_BUFFERING,
    play,
    pause,
    musicPause,
    setPlayerStateReady,
    skip,
    trimPlay,
    playMusic,
    skipToPreviousMusic,
    skipToNextMusic,
    bottomRef,
    getSongs,
    currentTrackId,
    currentTrackDetails,
    musicPlay,
    currentDiscoveryTrack,
    trimTrackState,
    resetTrack,
    changeToOrder,
    shuffleState,
    changeToShuffle,
    changeToRepeatOn,
    changeToRepeatOff,
    repeatState,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

// export function useProgress(updateInterval) {
//   const [states, setStates] = useState({position: 0, duration: 0, buffered: 0});
//   const playerState = usePlaybackState();

//   const getProgress = async () => {
//     const [position, duration, buffered] = await Promise.all([
//       TrackPlayer.getPosition(),
//       TrackPlayer.getDuration(),
//       TrackPlayer.getBufferedPosition(),
//     ]);

//     setStates({position, duration, buffered});
//   };

//   useEffect(() => {
//     if (playerState !== State.Playing && playerState !== State.Buffering)
//       return;
//     const poll = setInterval(getProgress, updateInterval || 1000);
//     return () => clearInterval(poll);
//   }, [playerState]);

//   return states;
// }

export function useMusicProgress(updateInterval) {
  const [musicStates, setMusicStates] = useState({
    position: 0,
    duration: 0,
    buffered: 0,
  });
  const musicPlayerState = usePlaybackState();
  const getMusicProgress = async () => {
    const [position, duration, buffered] = await Promise.all([
      TrackPlayer.getPosition(),
      TrackPlayer.getDuration(),
      TrackPlayer.getBufferedPosition(),
    ]);

    setMusicStates({position, duration, buffered});
  };

  useEffect(() => {
    if (
      musicPlayerState !== STATE_PLAYING &&
      musicPlayerState !== STATE_BUFFERING
    ) {
      return;
    }
    const poll = setInterval(getMusicProgress, updateInterval || 1000);
    return () => clearInterval(poll);
  }, [musicPlayerState]);

  return musicStates;
}

export const usePlayerContext = () => useContext(PlayerContext);
export const PlayerConsumer = PlayerContext.Consumer;
export default PlayerContext;
