import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import LikeBtn from '../../../Components/Button/LikeBtn'
const ReplysView = (props) => {
 
  return (
    <View style={{flexDirection: 'row', width: '70%', marginBottom: 20}}>
      <View style={styles.imageCont}>
        <Image
          source={require('../../../assests/images/caro1.jpg')}
          style={{width: '100%', height: 60, borderRadius: 60 / 2}}
        />
      </View>
      <View style={styles.singleComment}>
        {/* USER_NAME */}
        <Text style={styles.user_name}>{props.name}</Text>
        {/* COMMENT */}
        <Text style={styles.user_comment}>
          {props.comment}
          <Text style={{color: '#999', fontSize: 9}}>&nbsp;{props.time}s</Text>
        </Text>
      </View>
      <View style={{marginTop: 10}}>
        <LikeBtn col />
      </View>
    </View>
  );
};

export default ReplysView;

const styles = StyleSheet.create({
  imageCont: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    marginRight: 10,
  },
  user_name: {
    fontSize: 15,
    color: '#f68128',
    // marginBottom:5
  },
  user_comment: {
    color: '#eee',
    fontSize: 12,
    textAlign: 'left',
    // flexWrap: 'wrap',
  },
});
