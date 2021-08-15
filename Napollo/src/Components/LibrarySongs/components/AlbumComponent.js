import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MainImage from '../../../assests/images/caro.jpg';

const {width, height} = Dimensions.get('window');

const AlbumContainer = ({
  title,
  songs,
  details,
  name,
  photoUrl,
  song,
  artist,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} style={[styles.container, {}]}>
      <Image
        source={photoUrl ? {uri: photoUrl} : MainImage}
        style={styles.image}
      />
      {/* BLACK OVERLAY */}
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: '#000',
          opacity: 0.2,
        }}
      />
      <View style={{marginTop: 8, paddingLeft: 10}}>
        <Text
          numberOfLines={1}
          style={{
            color: '#eee',
            textTransform: 'capitalize',
            fontSize: 12,
            fontFamily: 'Helvetica-Bold',
          }}>
          {name}
          Used to this
        </Text>
        <Text
          style={{
            color: '#f68128',
            fontSize: 10,
            fontFamily: 'Helvetica-Medium',
          }}>
          {artist}Wizkid
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AlbumContainer;

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 200,

    marginRight: 15,
    borderRadius: 10,
    position: 'relative',
    marginVertical: 5,
  },
  image: {
    width: '100%',
    height: '70%',
    borderRadius: 10,
  },
  likes: {
    position: 'absolute',
    left: 10,
    bottom: 50,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
