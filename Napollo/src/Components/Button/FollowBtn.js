import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {follow_Artist, unFollow_Artist} from '../../redux/actions/userActions';

const FollowBtn = (props) => {
  const dispatch = useDispatch();

  const toggleFollow = () => {
    if (!props.follow) {
    //   dispatch(follow_Artist(props.artistIdentity));
      props.follow_Artist();
    } else {
      props.openAlert();
      //   dispatch(unFollow_Artist(props.artistIdentity));
      //   props.unFollow();
    }
  };
  return (
    <>
      {props.follow ? (
        <LinearGradient
          colors={['#feee3e', '#f68128', '#f68128']}
          style={[styles.btn, props.height ? {height: props.height} : {}]}>
          <TouchableOpacity
            activeOpacity={0.6}
            hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
            {...props}
            onPress={() => toggleFollow()}
            style={styles.btn2}>
            <Text
              style={[
                styles.btnText,
                props.textSize ? {fontSize: props.textSize} : null,
              ]}>
              {props.title}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      ) : (
        <TouchableOpacity
          activeOpacity={0.6}
          hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
          {...props}
          onPress={() => toggleFollow()}
          style={styles.btn3}>
          <Text
            style={[
              styles.btnText,
              props.textSize ? {fontSize: props.textSize} : null,
            ]}>
            {props.title}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default FollowBtn;

const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    marginBottom: 5,
  },
  btn: {
    width: '100%',
    borderRadius: 10,
    height: 35,
    // borderWidth: 1,
    padding: 12,
    alignSelf: 'center',
    backgroundColor: '#f68128',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btn2: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Gilroy-Bold',
    textTransform: 'capitalize',
    letterSpacing: 2,
    // width: '100%',
    // lineHeight: -2,
  },
  btn3: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#F68128',
    height: 35,
    borderRadius: 10,
    letterSpacing: 0,
  },
});
