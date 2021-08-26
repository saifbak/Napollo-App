import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {usePlayerContext} from '../../PlayerContext/PlayerContext';
import {scale, ScaledSheet} from 'react-native-size-matters';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const DiscoverSlide = (
  {
    // image,
    // title,
    // ownerAccountUser: {username},
    // featuredArtists,
  },
) => {
  const {firstName, lastName} = realArtist;
  const {
    isBuffering,
    isEmpty,
    isPaused,
    isPlaying,
    isStopped,
    play,
    pause,
    currentTrackDetails,
  } = usePlayerContext();

  const {
    image,
    title,
    ownerAccountUser: {username},
    featuredArtists,
  } = currentTrackDetails;

  const featuringArtist = featuredArtists?.join('&');

  let btnView = null;
  if (isBuffering) {
    btnView = (
      <View style={{position: 'absolute', top: '40%', left: '40%'}}>
        <ActivityIndicator color="#fff" size={55} />;
      </View>
    );
  }

  // let playBtn = null;
  // let pauseBtn = null;
  // let loadingAnimes = null;
  // let stoppedBtn = null;
  // if (isPlaying) {
  //   playBtn = (
  //     <TouchableOpacity
  //       activeOpacity={0.6}
  //       style={styles.playContainer}
  //       onPress={() => pause()}>
  //       <Icon
  //         name="ios-pause"
  //         size={40}
  //         color="#fff"
  //         style={{paddingLeft: 2}}
  //       />
  //     </TouchableOpacity>
  //   );
  // }
  // if (isPaused) {
  //   pauseBtn = (
  //     <TouchableOpacity
  //       activeOpacity={0.6}
  //       style={styles.playContainer}
  //       onPress={() => play()}>
  //       <Icon
  //         name="ios-caret-forward"
  //         size={40}
  //         color="#fff"
  //         style={{paddingLeft: 2}}
  //       />
  //     </TouchableOpacity>
  //   );
  // }
  // if (isBuffering) {
  //   loadingAnimes = (
  //     <TouchableOpacity activeOpacity={0.6} style={styles.playContainer}>
  //       <ActivityIndicator color="#fff" size="large" />
  //     </TouchableOpacity>
  //   );
  // }
  // if (isEmpty || isStopped) {
  //   stoppedBtn = (
  //     <TouchableOpacity
  //       activeOpacity={0.6}
  //       style={styles.playContainer}
  //       onPress={() => play()}>
  //       <Icon
  //         name="ios-pause"
  //         size={40}
  //         color="#fff"
  //         style={{paddingLeft: 2}}
  //       />
  //     </TouchableOpacity>
  //   );
  // }

  return (
    <ImageBackground
      source={image !== null || image !== '' ? {uri: image} : {}}
      style={[
        {
          width: SCREEN_WIDTH,
          position: 'absolute',
          top: 0,
          height: SCREEN_HEIGHT,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        image === null || image === ''
          ? {backgroundColor: 'rgba(255,255,255,0.061)'}
          : null,
      ]}
      blurRadius={100}
      resizeMode="cover">
      {/* <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: '#000',
          opacity: 0.3,
          zIndex: 300,
        }}
      /> */}
      <Image
        source={
          image !== null || image !== ''
            ? {uri: image}
            : require('../../assests/images/music-placeholder.png')
        }
        style={{
          width: SCREEN_WIDTH / 1.3,
          height: '52%',
          resizeMode: 'cover',
          // flex: 1,
          borderRadius: 10,
          marginBottom: 100,
          marginTop: '15%',
          alignSelf: 'center',
          zIndex: 100,
        }}
        resizeMode="cover"
      />
      {btnView}

      <View
        style={{
          position: 'absolute',
          bottom: '30%',
          left: 30,
          flexDirection: 'row',
          justifyContent: 'center',
          width: '90%',
          zIndex: 500,
        }}>
        <View>
          <Text
            style={{
              color: '#fff',
              textTransform: 'uppercase',
              fontSize: scale(20),
              fontFamily: 'Helvetica-ExtraBold',
            }}>
            {title}
            {featuringArtist && (
              <Text
                style={
                  styles.featuredArtists
                }>{`ft (${featuringArtist})`}</Text>
            )}
          </Text>
          <Text
            style={{
              color: '#f68128',
              textTransform: 'capitalize',
              fontSize: scale(15),
              fontFamily: 'Helvetica-ExtraBold',
              textAlign: 'center',
            }}>
            {`${username}`}
          </Text>
        </View>
        {/* {isPlaying && (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.playContainer}
            onPress={() => pause()}>
            <Icon
              name="ios-pause"
              size={40}
              color="#fff"
              style={{paddingLeft: 2}}
            />
          </TouchableOpacity>
        )}
        {isPaused && (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.playContainer}
            onPress={() => play()}>
            <Icon
              name="ios-caret-forward"
              size={40}
              color="#fff"
              style={{paddingLeft: 2}}
            />
          </TouchableOpacity>
        )} */}
        {/* {playBtn}
        {pauseBtn}
        {loadingAnimes}
        {stoppedBtn}  */}
        {/* {isBuffering && (
          <TouchableOpacity activeOpacity={0.8} style={styles.playContainer}>
            <ActivityIndicator color="#fff" size="large" />;
          </TouchableOpacity>
        )}
        {isEmpty && (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.playContainer}
            onPress={() => play()}>
            <Icon
              name="ios-pause"
              size={40}
              color="#fff"
              style={{paddingLeft: 2}}
            />
          </TouchableOpacity>
        )} */}
      </View>
    </ImageBackground>
  );
};

export default DiscoverSlide;

const styles = StyleSheet.create({
  playContainer: {
    // padding: 5,
    borderRadius: 55 / 2,
    width: 55,
    height: 55,
    borderColor: '#f68128',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 20,

    backgroundColor: '#f68128',
    alignSelf: 'flex-end',
  },
});
