import React from 'react';
// import { StyleSheet, Text, View } from 'react-native'
import {StyleSheet, Text, View, Image} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import ImageArt from '../../../../assests/images/caro.jpg';
import Icon from 'react-native-vector-icons/Ionicons';
import Music from '../../../../assests/images/music-placeholder.png';
import {mainNumberFormat} from '../../../../utils/loggedInUserType';
import moment from 'moment';

const GenralLike = props => {
  const {activityType, activityDateTime, media} = props;
  const date = moment(activityDateTime).startOf('hour').fromNow();
  if (activityType === 'LIKE_MEDIA') {
    return (
      <View style={styles.container}>
        <View style={styles.iconCont}>
          <Icon name="heart" color="#999" size={scale(13)} />
          <Text style={styles.activityText}>You liked this song</Text>
        </View>
        {/* SONG DETAILS */}
        <View style={styles.songDetails}>
          <View style={styles.artistImage}>
            {media?.ownerAccountUser?.profileUrl === undefined ||
            media?.ownerAccountUser?.profileUrl === null ? (
              <View style={styles.thumbNail}>
                <Text style={[styles.thumbNailName, {marginRight: 2}]}>
                  {media?.ownerAccountUser?.firstName
                    ? media?.ownerAccountUser?.firstName[0]
                    : null}
                </Text>
                <Text style={styles.thumbNailName}>
                  {media?.ownerAccountUser?.lastName
                    ? media?.ownerAccountUser?.lastName[0]
                    : null}
                </Text>
              </View>
            ) : (
              <Image
                style={styles.image}
                source={{uri: media?.ownerAccountUser?.profileUrl}}
              />
            )}
            {/* <Image source={ImageArt} style={styles.image} /> */}
          </View>
          <View style={styles.artistDetails}>
            <View style={styles.nameCont}>
              <View>
                <Text style={styles.artistName}>{media?.title}</Text>
                <Text style={styles.userName}>
                  @{media?.ownerAccountUser?.username}
                </Text>
              </View>
              <View>
                <Text style={styles.timeStamp}>{date}</Text>
              </View>
            </View>
            {/* SONG */}
            <View style={styles.songData}>
              <Image
                source={
                  media?.image === null || media?.image === undefined
                    ? Music
                    : {uri: media?.image}
                }
                style={styles.songArt}
              />
              <View
                style={{
                  marginLeft: scale(10),
                  paddingTop: scale(10),
                  width: '52%',
                }}>
                <Text
                  numberOfLines={1}
                  style={[styles.artistName, {fontSize: scale(12)}]}>
                  Drake
                </Text>
                <Text style={[styles.userName, {fontSize: scale(9)}]}>
                  @Drake
                </Text>
                <View style={styles.iconCont2}>
                  <View style={styles.singleIcon}>
                    <Icon name="play" color="#F68128" size={scale(12)} />
                    <Text style={styles.singleIconText}>
                      {mainNumberFormat(`${media?.hits}`)}
                    </Text>
                  </View>
                  <View style={styles.singleIcon}>
                    <Icon name="heart" color="#F68128" size={scale(12)} />
                    <Text style={styles.singleIconText}>
                      {mainNumberFormat(`${media?.likes}`)}
                    </Text>
                  </View>
                  <View style={styles.singleIcon}>
                    <Icon name="chatbubble" color="#F68128" size={scale(12)} />
                    <Text style={styles.singleIconText}>
                      {mainNumberFormat(`${media?.comments}`)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  } else if (activityType === 'LIKE_ALBUM') {
    <View style={styles.container}>
      <Text style={styles.artistName}>Album</Text>
    </View>;
  } else if (activityType === 'LIKE_PLAYLIST') {
    <View style={styles.container}>
      <Text style={styles.artistName}>Playlist</Text>
    </View>;
  }
};

export default GenralLike;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // backgroundColor: 'rgba(0,0,0,0.4)',
    backgroundColor: 'rgba(255,255,255,0.061)',
    borderRadius: '10@s',
    paddingVertical: '20@s',
    paddingHorizontal: '10@s',
    marginBottom: '15@s',
  },
  iconCont: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '35@s',
  },
  activityText: {
    fontFamily: 'Helvetica-ExtraBold',
    fontSize: '10@s',
    color: '#999',
    marginLeft: '10@s',
  },
  songDetails: {
    width: '100%',
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '10@s',
  },
  artistImage: {
    width: '50@s',
    height: '50@s',
    borderRadius: '50@s',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: '50@s',
  },
  artistDetails: {
    width: '80%',
    marginLeft: '13@s',
    paddingRight: '10@s',
  },
  nameCont: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    // paddingRight: '10@s',
    marginBottom: '10@s',
  },
  artistName: {
    color: '#ddd',
    fontSize: '14@s',
    fontFamily: 'Helvetica-Bold',
  },
  userName: {
    color: '#F68128',
    fontSize: '10@s',
    fontFamily: 'Helvetica-Bold',
    textTransform: 'lowercase',
  },
  timeStamp: {
    color: '#888',
    fontSize: '12@s',
    fontFamily: 'Helvetica-Bold',
  },
  songData: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    width: '100%',
    borderRadius: '10@s',
    height: '90@s',
    backgroundColor: 'rgba(255,255,255,0.065)',
  },
  songArt: {
    height: '100%',
    width: '40%',
    borderRadius: '10@s',
  },
  iconCont2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '15%',
    // width: '100%',
  },
  singleIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '8%',
  },
  singleIconText: {
    fontSize: '11@s',
    color: '#ddd',
    fontFamily: 'Helvetica-Bold',
    marginLeft: '3@s',
  },
  thumbNail: {
    width: '50@s',
    height: '50@s',
    borderRadius: '50@s',
    backgroundColor: '#555',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: '10@s',
  },
  thumbNailName: {
    fontSize: '13@s',
    color: '#eee',
    fontFamily: 'Helvetica-Bold',
  },
});
