import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import CustomHeader from '../../Components/CustomHeader/CommonHeader';
import SongContainer from '../../Components/LibrarySongs/GeneralSong';
import data from '../../data';

const {width, height} = Dimensions.get('window');

const FavoriteScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <CustomHeader title="Favorites Songs" />
          <View style={styles.content}>
            <FlatList
              contentContainerStyle={{marginTop: 20}}
              data={data}
              keyExtractor={(item) => item.artwork}
              renderItem={({item}) => <SongContainer {...item} />}
            />
            {/* <SongContainer /> */}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
    // paddingTop: 80,
  },
  content: {
    // marginTop: 100,
    width,
    flex: 1,
    height,
    paddingHorizontal: 25,
  },
});
