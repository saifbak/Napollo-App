import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {usePlayerContext} from '../../PlayerContext/PlayerContext';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {openModalPlayer} from '../../redux/actions/musicPlayerActions';
import {useNavigation} from '@react-navigation/native';
import {scale, ScaledSheet} from 'react-native-size-matters';

const CarouselItem = ({
  title,
  numListening,
  image,
  hits,
  url,
  id,
  allSongs,
  index,
  ownerAccountUser,
  featuredArtists,
}) => {
  const playerContext = usePlayerContext();
  const dispatch = useDispatch();
  const currentTrack = {
    title,
    url,
    image,
    id,
    artwork: image,
    artist: ownerAccountUser.username,
    featuredArtists,
    ownerAccountUser: ownerAccountUser,
  };
  const allSong = {
    currentTrack,
    mediaSongs: allSongs,
    // mediaSongs: props.allSongs?.filter(
    //   (x) => x.mediaIdentity !== currentTrack?.id,
    // ),
  };
  const featuringArtist = featuredArtists.join('&');
  const navigate = () => {
    dispatch(openModalPlayer(allSong));
    // console.log(playerContext.currentTrackDetails, 'when PLAY IS CLICCKED');

    // const check = [...allSongs];
    const check = [allSong.currentTrack, ...allSong.mediaSongs];
    

    // playerContext.playMusic(allSongs.currentTrack, check);
    // console.log(index, 'INDEX');
    playerContext.playMusic(check, index);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => navigate()}>
      <ImageBackground
        borderRadius={10}
        source={{uri: image}}
        style={styles.container}>
        <LinearGradient
          colors={[
            'rgba(0,0,0,0.25)',
            'rgba(0,0,0,0.25)',
            'rgba(0,0,0,0.6)',
            'rgba(0,0,0,0.75)',
            'rgba(0,0,0,0.75)',
            'rgba(0,0,0,0.75)',
            'rgba(0,0,0,0.75)',
          ]}
          style={styles.gradient}>
          <Text
            numberOfLines={1}
            style={{
              color: '#F68128',
              position: 'absolute',
              bottom: scale(37),
              fontFamily: 'Helvetica-Bold',
              fontSize: scale(10),
              textTransform: 'capitalize',
              paddingLeft: 10,
              width: '95%',
            }}>
            {title}&nbsp;
            {featuringArtist && (
              <Text
                style={
                  styles.featuredArtists
                }>{`ft (${featuringArtist})`}</Text>
            )}
          </Text>
          <Text
            style={{
              color: '#eee',
              position: 'absolute',
              bottom: scale(22),
              fontFamily: 'Helvetica-Bold',
              fontSize: scale(8),
              textTransform: 'capitalize',
              paddingLeft: 10,
            }}>
            {ownerAccountUser.username}
          </Text>
          <View style={styles.listner}>
            <Icon
              name="headset"
              color="#999"
              size={scale(11)}
              style={{marginRight: 5}}
            />
            <Text
              style={{
                color: '#999',
                fontFamily: 'Helvetica-Medium',
                fontSize: scale(9),
                textTransform: 'capitalize',
              }}>
              {hits}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CarouselItem;

const styles = ScaledSheet.create({
  container: {
    // flex: 1,
    width: 160,
    height: 150,
    borderRadius: 20,
    marginRight: 20,
  },
  imageContainer: {
    // flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
  },
  gradient: {
    position: 'absolute',
    zIndex: 1000,
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  listner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    paddingLeft: 10,
  },
  featuredArtists: {
    fontSize: '8@s',
  },
});

//  <View style={styles.container}>
//    <View style={styles.imageContainer}>
//      <Image
//        source={image}
//        style={{width: '100%', height: '100%', borderRadius: 10}}
//        blurRadius={0.5}
//      />
//      <Text
//        style={{
//          color: '#fff',
//          position: 'absolute',
//          top: 30,
//          fontFamily: 'Helvetica-Bold',
//          fontSize: 13,
//          textTransform: 'capitalize',
//        }}>
//        {title}
//      </Text>
//    </View>
//    <View style={{marginTop: 6, paddingLeft: 5}}>
//      <Text
//        style={{
//          color: '#fff',
//          fontSize: 12,
//          fontFamily: 'Gilroy-Bold',
//          textTransform: 'capitalize',
//        }}>
//        {title}
//      </Text>
//      <Text
//        style={{
//          color: '#f68128',
//          fontSize: 10,
//          fontFamily: 'Gilroy-Regular',
//          textTransform: 'capitalize',
//        }}>
//        {numListening}&nbsp;Listening
//      </Text>
//    </View>
//  </View>;
