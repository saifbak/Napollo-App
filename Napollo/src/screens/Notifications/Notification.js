import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import LikedComponent from './component/LikedComponent';
import CommentComponent from './component/CommentComponent';
import FollowComponent from './component/FollowComponent';
import NotificationsHeader from './component/NotificationsHeader';
import NotificationsFilterModal from '../../Components/Modal/NotificationFilterModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  openNotificationFilterModal,
  closeNotificationFilterModal,
} from '../../redux/actions/notificationFilterActions';
import GeneralBottomSheet from '../../Components/BottomSheet/GeneralBottomSheet';

const {width, height} = Dimensions.get('window');

const Notification = () => {
  const dispatch = useDispatch();
  const Bs = useRef(null);

  const openBottomSheet = () => {
    Bs.current.open();
  };
  const closeBottomSheet = () => {
    Bs.current.close();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor="#000" />
        {/* HEADER */}
        {/* <CustomHeader title="Notifications" /> */}
        {/* CONTENT */}
        {/* <TouchableWithoutFeedback
          onPress={() => dispatch(closeNotificationFilterModal())}> */}
        <View style={{}}>
          {/* SUBHEADER */}
          <NotificationsHeader
            title="Notifications"
            onPress={openBottomSheet}
          />
          {/* <NotificationsFilterModal /> */}
          {/* SUB CONTENT */}
          <ScrollView
            contentContainerStyle={{
              marginTop: 20,
              paddingHorizontal: 15,
              paddingBottom: 80,
              maxWidth: width,
            }}>
            {/* SUB CONTENT TITLE */}
            <Text
              style={{
                color: '#f68128',
                fontFamily: 'Helvetica-Bold',
                fontSize: 16,
              }}>
              Today
            </Text>
            {/* TODAY COMMENT */}
            <View
              style={{
                flex: 1,
                borderBottomColor: '#333',
                borderWidth: 1,
                paddingBottom: 20,
              }}>
              <LikedComponent video name="Martinss" type="video" />
              <CommentComponent name="Martins" />
              <FollowComponent name="Martin" />
              <FollowComponent name="Martin" />
              <FollowComponent name="Martin" />
            </View>
            {/* THIS WEEK NOTIFICATIONS */}
            <View style={{flex: 1, marginTop: 20}}>
              <Text
                style={{
                  color: '#f68128',
                  fontFamily: 'Helvetica-Bold',
                  fontSize: 16,
                }}>
                This Week
              </Text>
              <FollowComponent name="Martins" />
              <LikedComponent video name="Martinss" type="video" />
              <CommentComponent name="Martins" />
              <LikedComponent video name="Martinss" type="video" />
              <CommentComponent name="Martins" />
            </View>
          </ScrollView>
          <GeneralBottomSheet ref={Bs} height={350} radius={20}>
            <NotificationsFilterModal onPress={closeBottomSheet} />
          </GeneralBottomSheet>
        </View>
        {/* </TouchableWithoutFeedback> */}
      </SafeAreaView>
    </ScrollView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    maxWidth: width,
    paddingBottom: 10,
  },
});
