import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {
  unLikeMedia,
  likeMedia,
} from '../../redux/actions/MediaActions/Like_UnLike/Like_Unlike';
import {scale, ScaledSheet} from 'react-native-size-matters';

const LikeBtn = ({col, numListening, likes, likeCount, mediaId}) => {
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);
  const [userLike, setUserLike] = useState(likes);

  const toggleLikeUnlikeMedia = () => {
    if (!like) {
      dispatch(likeMedia(mediaId));
      setLike(true);
      setUserLike(userLike + 1);
    } else {
      dispatch(unLikeMedia(mediaId));
      setLike(false);
      if (userLike >= 0) setUserLike(userLike - 1);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => toggleLikeUnlikeMedia()}
      activeOpacity={0.8}
      style={
        col
          ? {
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }
          : {flexDirection: 'row'}
      }>
      <Icon
        name={!like ? 'heart-outline' : 'heart-sharp'}
        color={!like ? '#eee' : '#f68126'}
        size={col ? scale(20) : scale(18)}
        // style={{marginBottom: 5}}
      />
      {!like ? (
        <Text
          style={
            col
              ? {color: '#eee', fontSize: scale(11)}
              : {color: '#eee', fontSize: scale(13), marginLeft: 5}
          }>
          {userLike}
        </Text>
      ) : (
        <Text
          style={
            col
              ? {color: '#f68128', fontSize: scale(11)}
              : {color: '#f68128', fontSize: scale(13), marginLeft: 5}
          }>
          {userLike}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default LikeBtn;

const styles = StyleSheet.create({});
