import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {get_User_Activities} from '../../../../redux/actions/userActions';
import {scale, ScaledSheet} from 'react-native-size-matters';
import LikedMedia from '../../component/LikedActivitiesComp/LikedMedia';
import CreatePlaylist from '../../component/CreateActivitiesComp/CreatePlaylist';
import ReplyActivities from '../../component/CommentActivitiesComp/ReplyActivities';
import CommentActivites from '../../component/CommentActivitiesComp/CommentActivities';

const Activities = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const getAllUsersActivities = useSelector(
    state => state.getAllUsersActivities,
  );
  const {loading, error, data} = getAllUsersActivities;
  const func = media => {
    media.forEach((item, index) => {
      if (item.activityType === 'LIKE_MEDIA') {
        return (
          <View>
            <Text style={{color: '#fff'}}>{item.activityType}</Text>
          </View>
        );
      } else if (item.activityType === 'COMMENT') {
        return (
          <View>
            <Text style={{color: '#fff'}}>{item.activityType}</Text>
          </View>
        );
      } else if (item.activityType === 'CREATE_PLAYLIST') {
        return (
          <View>
            <Text style={{color: '#fff'}}>{item.activityType}</Text>
          </View>
        );
      } else if (item.activityType === 'REPLY') {
        return (
          <View>
            <Text style={{color: '#fff'}}>{item.activityType}</Text>
          </View>
        );
      }
    });
  };
  // const func = media => {
  //   media.forEach((item, index) => {
  //     if (item.activityType === 'LIKE_MEDIA') {
  //       return <LikedMedia {...item} />;
  //     } else if (item.activityType === 'COMMENT') {
  //       return <CommentActivites {...item} />;
  //     } else if (item.activityType === 'CREATE_PLAYLIST') {
  //       return <CreatePlaylist {...item} />;
  //     } else if (item.activityType === 'REPLY') {
  //       return <ReplyActivities {...item} />;
  //     }
  //   });
  // };

  const getData = () => {
    dispatch(get_User_Activities(page, size));
  };

  let mainView = null;
  const likeArray = data.filter(item => item.activityType === 'LIKE_MEDIA');
  const commentArray = data.filter(item => item.activityType === 'COMMENT');
  const replyArray = data.filter(item => item.activityType === 'REPLY');
  const playlistArray = data.filter(
    item => item.activityType === 'CREATE_PLAYLIST',
  );

  if (data.length <= 0 && !loading && !error) {
    mainView = (
      <View style={{alignSelf: 'center', width: '100%'}}>
        <Text
          style={{
            color: '#fff',
            fontWeight: '800',
            fontFamily: 'Helvetica-ExtraBold',
            fontSize: scale(13),
            marginTop: 30,
            textAlign: 'center',
          }}>
          You don't have any activities registered yet.
        </Text>
      </View>
    );
  } else if (loading) {
    mainView = (
      <View style={{alignSelf: 'center', marginTop: 20}}>
        <ActivityIndicator size={30} color="#F68128" />
      </View>
    );
  } else if (error) {
    mainView = (
      <TouchableOpacity activeOpacity={0.7} onPress={() => getData()}>
        <Text
          style={{
            color: '#999',
            fontSize: scale(13),
            textAlign: 'center',
            marginTop: 10,
          }}>
          {error}
        </Text>
        <Text
          style={{
            color: '#F68128',
            fontSize: scale(11),
            textAlign: 'center',
            marginTop: 20,
            fontFamily: 'Helvetica-Bold',
          }}>
          Try Again
        </Text>
      </TouchableOpacity>
    );
  }
  // else {
  return (
    <View style={styles.container}>
      {mainView}
      <View
        style={{
          width: '100%',
          justifyContent: 'flex-end',
          marginBottom: scale(10),
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('AllActivities')}>
          <Text
            style={{
              color: '#999',
              fontSize: scale(11),
              fontFamily: 'Helvetica-Bold',
            }}>
            View All
          </Text>
        </TouchableOpacity>
      </View>
      {likeArray.slice(0, 2).map((item, index) => (
        <LikedMedia {...item} key={index} />
      ))}
      {commentArray.slice(0, 2).map((item, index) => (
        <CommentActivites {...item} key={index} />
      ))}
      {playlistArray.slice(0, 2).map((item, index) => (
        <CreatePlaylist {...item} key={index} />
      ))}
      {replyArray.slice(0, 2).map((item, index) => (
        <ReplyActivities {...item} key={index} />
      ))}
      {/* {func(data)} */}
      {/* {data.forEach((item, index) => (
        <>
          {item.activityType === 'LIKE_MEDIA' && <LikedMedia {...item} />}
          {item.activityType === 'REPLY' && <ReplyActivities {...item} />}
          {item.activityType === 'COMMENT' && <CommentActivites {...item} />}
          {item.activityType === 'CREATE_PLAYLIST' && (
            <CreatePlaylist {...item} />
          )}
        </>
      ))} */}
    </View>
  );
  // }
};

export default Activities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
});
