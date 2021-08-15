import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useEffect} from 'react-redux';

const ArtistMostPlayedCont = (props) => {
  const {
    mediaTitle,
    photoUrl,
    hitCount,
    likeCount,
    mediaIdentity,
    artist: {stageName},
  } = props;
  console.log(props.artist, 'ARTISTS');
  const songDetails = {
    mediaTitle,
    photoUrl,
    hitCount,
    likeCount,
    mediaIdentity,
    artist: stageName,
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => props.chooseSongDetails(songDetails)}
        activeOpacity={0.7}
        style={styles.content}>
        <Image
          style={{width: 60, height: 60, borderRadius: 10, marginRight: 15}}
          source={
            props.photoUrl
              ? {uri: props.photoUrl}
              : require('../../../../assests/images/image.jpg')
          }
        />
        <View>
          <Text numberOfLines={1} style={styles.songName}>
            {props.mediaTitle ? props.mediaTitle : 'Infinity ft Omah Lay'}
          </Text>
          <View style={styles.listner}>
            <Icon
              name="headset"
              color="#999"
              size={17}
              style={{marginRight: 5}}
            />
            <Text
              style={{
                color: '#999',
                fontFamily: 'Helvetica-Medium',
                fontSize: 14,
                textTransform: 'capitalize',
              }}>
              {/* {hitCount} */}
              {props.hitCount}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={styles.likesText}>
          {/* {props.likeCount ? `${props.likeCount} likes` : '12.4k Likes'} */}
          {`${props.likeCount} likes`}
        </Text>
      </View>
    </View>
  );
};

export default ArtistMostPlayedCont;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.061)',
    padding: 5,
    borderRadius: 10,
  },
  songName: {
    color: '#F68128',
    fontFamily: 'Helvetica-Bold',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  likesText: {
    color: '#eee',
    fontFamily: 'Helvetica-Medium',
    fontSize: 14,
    textTransform: 'capitalize',
    paddingRight: 10,
  },
});
