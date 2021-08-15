import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {SharePost} from '../../../../utils/ShareSocals';
import {DEFAULT_IMAGE_URI} from '../../../../utils/ImagePicker';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

const renderItem = ({icon, title}) => (
  <View style={{flexDirection: 'row'}}>
    <Icon name={icon} size={30} color="#999" style={{marginRight: 10}} />
    <Text style={{color: '#f68128'}}>{title}</Text>
  </View>
);
const BottomSheet = ({onPress}) => {
  const navigation = useNavigation();
  const arr = [
    {icon: 'share-social-outline', title: 'Share', onPress: () => share()},
    //    
    // {icon: 'ios-sync-outline', title: 'Repost @aye post', onPress: () => null},
    // {
    //   icon: 'add-circle-outline',
    //   title: 'Add to my playlist',
    //   onPress: () => null,
    // },

    {
      icon: 'return-up-forward',
      title: 'Go to @aye profile page',
      onPress: () => null,
    },
    {icon: 'alert-circle-outline', title: 'Report', onPress: () => null},
  ];
  const options = {
    message: 'Test message',
    // type: 'image/jpeg',
    // url: 'https://samplesongs.netlify.app/album-arts/death-bed.jpg',
  };
  const share = () => {
    onPress.current.snapTo(1);
    SharePost(options);
  };
  const navigateShare = () => {
    onPress.current.snapTo(1);
    navigation.navigate('Upload', {screen: 'Upload_Share'});
  };
  return (
    <View
      style={{
        backgroundColor: '#1A1A1A',
        height: '100%',
        paddingHorizontal: 20,
        paddingTop: 20,
      }}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => onPress.current.snapTo(1)}
        hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}>
        <View style={styles.bar}></View>
      </TouchableOpacity>
      <FlatList
        data={arr}
        keyExtractor={(item) => item.icon}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => item.onPress()}
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              alignItems: 'center',
            }}>
            <Icon
              name={item.icon}
              size={30}
              color="#888"
              style={{marginRight: 10}}
            />

            <Text style={{color: '#eee', marginTop: 3}}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
// alert-circle-outline
// add-cirle-outline
// crop-utlineo
// return-up-forward
//share-social-ouline
// ios-sync-outline

export default BottomSheet;

const styles = StyleSheet.create({
  bar: {
    width: 100,
    height: 8,
    backgroundColor: '#f68128',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 6,
  },
});
