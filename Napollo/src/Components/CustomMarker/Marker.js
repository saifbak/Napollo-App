import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Marker = ({item}) => {
  return (
    <TouchableOpacity
      onPress={() => alert('Hello')}
      style={{
        flexDirection: 'column',
        // position: 'absolute',
        // zIndex: 100,
        // top: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon name="md-pin" color="#f68128" size={40} />
      <Image
        source={{uri: item}}
        style={{width: 60, height: 60, borderRadius: 60 / 2}}
      />
    </TouchableOpacity>
  );
};

export default Marker;

const styles = StyleSheet.create({});
