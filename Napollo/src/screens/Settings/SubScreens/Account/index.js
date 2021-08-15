import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../../../../Components/CustomHeader/CommonHeader';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {getLoggedInUserProfile} from '../../../../utils/loggedInUserType';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Divider from '../../../../Components/Divider/Divider';
import SingleSubSettingsCont from '../../component/SingleSubSettings';

const {width, height} = Dimensions.get('window');

const index = () => {
  const userData = getLoggedInUserProfile('LISTENER');

  const {
    userProfile: {
      firstName,
      lastName,
      username,
      followerCount,
      followingCount,
      website,
      state,
      country,
      profileUrl,
      emailAddress,
    },
  } = userData;

  return (
    <View style={styles.container}>
      <CustomHeader title={`@${username}`} />
      <View style={styles.content}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 30, flex: 1}}>
          <View style={styles.imgCont}>
            {profileUrl === '' || profileUrl === null ? (
              <View style={styles.thumbNail}>
                <Text style={[styles.thumbNailName, {marginRight: 10}]}>
                  {firstName ? firstName[0] : null}
                </Text>
                <Text style={styles.thumbNailName}>
                  {lastName ? lastName[0] : null}
                </Text>
              </View>
            ) : (
              <Image style={styles.profileImage} source={{uri: profileUrl}} />
            )}
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.imgText}>Become an Artist</Text>
            </TouchableOpacity>
          </View>
          <View>
            <SingleSubSettingsCont
              title="Update your username"
              text={`@${username}`}
            />
            <SingleSubSettingsCont
              title="Update your password"
              text="***********"
            />
          </View>
        </ScrollView>
      </View>
      <Text></Text>
    </View>
  );
};

export default index;

const styles = ScaledSheet.create({
  container: {
    width,
    height,
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
  },
  thumbNail: {
    width: '100@s',
    height: '100@s',
    borderRadius: '100@s',
    backgroundColor: '#555',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: wp('4%'),
  },
  thumbNailName: {
    fontSize: '15@s',
    color: '#eee',
    fontFamily: 'Helvetica-Bold',
  },
  profileImage: {
    width: '100@s',
    height: '100@s',
    borderRadius: '100@s',
    // marginRight: '10@s',
  },
  imgCont: {
    // backgroundColor: '#900',
    height: '40%',
    alignItems: 'center',
    paddingTop: '30@s',
    borderBottomColor: '#444',
    borderWidth: 0.5,
  },
  imgText: {
    fontSize: '12@s',
    fontFamily: 'Helvetica-Medium',
    marginVertical: 10,
    color: '#f68128',
  },
});
