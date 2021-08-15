import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import TrendingTabHeader from './TabsScreen/TabHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import TodayScreen from './TabsScreen/TodayScreen';
import WeekScreen from './TabsScreen/WeekScreen';
import MonthScreen from './TabsScreen/MonthScreen';

const Trending = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <TrendingTabHeader />
      </SafeAreaView>
    </View>
  );
};

export default Trending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    height: hp('100%'),
    width: wp('100%'),
    ...Platform.select({
      ios: {
        paddingTop: getStatusBarHeight() - 10,
      },
      android: {
        paddingTop: getStatusBarHeight() - 20,
      },
    }),
  },
});

//  <StatusBar backgroundColor="#000"/>
//             <TrendingTabHeader/>
