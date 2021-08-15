import React, {useEffect, useRef, useState} from 'react';
import {Container, Header, Tab, Tabs, ScrollableTab, Text} from 'native-base';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
// SCREENS
import TodayScreen from './TodayScreen';
import WeekScreen from './WeekScreen';
import MonthScreen from './MonthScreen';

const {width, height} = Dimensions.get('window');

const TrendingTabHeader = () => {
  // const inputRef = useRef('');
  const [text, setText] = useState('');
  const navigation = useNavigation();

  const [activeIndex, setActiveIndex] = useState(0);
  const segmentClicked = (index) => {
    return setActiveIndex(index);
  };
  let renderViews;

  if (activeIndex == 0) {
    renderViews = <TodayScreen />;
  }
  if (activeIndex == 1) {
    renderViews = <WeekScreen />;
  }
  if (activeIndex == 2) {
    renderViews = <MonthScreen />;
  }

  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#000', width, height}}>
      <View style={styles.container}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '80%'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
            activeOpacity={0.7}
            style={{marginRight: 15}}>
            <Icon name="md-arrow-back" size={24} color="#f68128" />
          </TouchableOpacity>
          <TextInput
            placeholder="Search Songs"
            style={{color: '#fff'}}
            // ref={inputRef}
            value={text}
            placeholderTextColor="#999"
            onChangeText={(val) => setText(val)}
          />
        </View>
        {/* <TouchableOpacity
          hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
          activeOpacity={0.7}
          onPress={() => null}
          style={{}}>
          <Icon name="options" size={24} color="#f68128" />
        </TouchableOpacity> */}
      </View>
      <View style={{marginTop: 10, marginHorizontal: 10}}>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-evenly',
            backgroundColor: 'rgba(255,255,255,0.061)',
            alignItems: 'center',
            borderRadius: 5,
            height: 50,
            padding: 5,
          }}>
          {/* SECOND TAB */}

          <TouchableOpacity
            hitSlop={{top: 50, right: 50, left: 50, bottom: 50}}
            activeOpacity={0.6}
            onPress={() => segmentClicked(0)}
            style={[
              activeIndex == 0
                ? {
                    backgroundColor: '#F68128',
                    height: '100%',
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '33.3%',
                    justifyContent: 'center',
                  }
                : {
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '33.3%',
                    justifyContent: 'center',
                  },
            ]}>
            <Text
              style={[
                activeIndex == 0
                  ? {
                      color: '#fff',
                      // transform: [{translateY: -10}],
                      fontFamily: 'Helvetica-Bold',
                      textAlign: 'center',
                    }
                  : {color: '#999', fontFamily: 'Helvetica-Bold'},
              ]}>
              Today
            </Text>
          </TouchableOpacity>
          {/* THIRD TAB */}
          <TouchableOpacity
            hitSlop={{top: 50, right: 50, left: 50, bottom: 50}}
            activeOpacity={0.6}
            onPress={() => segmentClicked(1)}
            style={[
              activeIndex == 1
                ? {
                    backgroundColor: '#F68128',
                    height: '100%',
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '33.3%',
                    justifyContent: 'center',
                  }
                : {
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '33.3%',
                    justifyContent: 'center',
                  },
            ]}>
            <Text
              style={[
                activeIndex == 1
                  ? {
                      color: '#fff',
                      // transform: [{translateY: -10}],
                      fontFamily: 'Helvetica-Bold',
                      textAlign: 'center',
                    }
                  : {color: '#999', fontFamily: 'Helvetica-Bold'},
              ]}>
              Weekly
            </Text>
          </TouchableOpacity>
          {/* FOURTH TAB */}
          <TouchableOpacity
            hitSlop={{top: 50, right: 50, left: 50, bottom: 50}}
            activeOpacity={0.6}
            onPress={() => segmentClicked(2)}
            style={[
              activeIndex == 2
                ? {
                    backgroundColor: '#F68128',
                    height: '100%',
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '33.3%',
                    justifyContent: 'center',
                  }
                : {
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '33.3%',
                    justifyContent: 'center',
                  },
            ]}>
            <Text
              style={[
                activeIndex == 2
                  ? {
                      color: '#fff',
                      // transform: [{translateY: -10}],
                      fontFamily: 'Helvetica-Bold',
                      textAlign: 'center',
                    }
                  : {color: '#999', fontFamily: 'Helvetica-Bold'},
              ]}>
              Monthly
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{paddingTop: 10, paddingHorizontal: 5}}>
          {renderViews}
        </ScrollView>
      </View>
    </View>
  );
};
export default TrendingTabHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    width: '100%',
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 100,
    elevation: 5,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
});

{
  /* <Tabs
          style={{backgroundColor: '#000'}}
          renderTabBar={() => (
            <ScrollableTab
              style={{borderWidth: 0}}
              underlineStyle={{backgroundColor: '#f68128'}}
              backgroundColor="#000"
            />
          )}
          tabContainerStyle={{borderBottomWidth: 0, borderBottomColor: '#000'}}>
          <Tab
            tabStyle={{backgroundColor: '#000'}}
            activeTabStyle={{backgroundColor: '#000'}}
            heading="Today"
            textStyle={{color: '#999', fontSize: 11}}
            activeTextStyle={{color: '#f68128'}}>
            <TodayScreen />
          </Tab>
          <Tab
            tabStyle={{backgroundColor: '#000'}}
            heading="Week"
            activeTabStyle={{backgroundColor: '#000'}}
            textStyle={{color: '#999', fontSize: 15}}
            activeTextStyle={{color: '#f68128'}}>
            <WeekScreen />
          </Tab>
          <Tab
            tabStyle={{backgroundColor: '#000'}}
            heading="Month"
            activeTabStyle={{backgroundColor: '#000'}}
            textStyle={{color: '#999', fontSize: 15}}
            activeTextStyle={{color: '#f68128'}}>
            <MonthScreen />
          </Tab>
        </Tabs> */
}
