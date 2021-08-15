import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeProfile from './HomeComponent/HomeProfile/HomeProfile';
import HomeInfo from './HomeComponent/HomeInfo/HomeInfo';
import HomeAddButton from './Add Button/HomeAddButton';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheets from './HomeComponent/BottomSheet/BottomSheet.js';
import {useSelector, useDispatch} from 'react-redux';
import {
  login,
  clearData,
  get_User_Profile,
  storeUserCoordinates,storeUserLocation
} from '../../redux/actions/userActions';
import {get_Artist_Profile} from '../../redux/actions/artistActions';
import Comment_Modal from '../../Components/Modal/Comment_Modal';
import SinglePost from './HomeComponent/SinglePost';
import ArtistPostModal from '../../Components/Modal/ArtistPostModal';
import Loader from '../../Components/Animations/ActivityIndicator';
import PlayContainer from '../../Components/Modal/components/PlayContainer';
import BottomSongModal from '../../Components/Modal/SongBottomModal';
import {getUserLocation} from '../../utils/AppPermissions';

const {width, height} = Dimensions.get('window');
const Home = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [artistPostModal, setArtistPostModal] = useState(false);
  const [postPics, setPostPics] = useState('');
  const [postSong, setPostSong] = useState('');
  const userLogin = useSelector(state => state.userLogin);
  const {type} = userLogin;

  const openPostModal = () => {
    setArtistPostModal(true);
  };
  const closePostModal = () => {
    setArtistPostModal(false);
  };

  const choosePostsPics = val => {
    setPostPics(val);
  };
  const choosePostsSong = val => {
    setPostSong(val);
  };


const getUserLocation = () => {
  Geolocation.getCurrentPosition(
    position => {
      if (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const userPosition = {
          lat,
          lng,
        };
        dispatch(storeUserCoordinates(userPosition));
        Geocoder.geocodePosition(userPosition)
          .then(res => {
            console.log('USER REAL LOCATION', res[0]);
            const data = {
              city: res[0].subAdminArea,
              state: res[0].adminArea,
              country: res[0].country,
              countryCode: res[0].countryCode,
            };
            dispatch(storeUserLocation(data));
          })
          .catch(err => console.log(err));
      }
    },
    error => {
      console.log(error.code, error.message, 'ERROR');
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
};
useEffect(() => {
  getUserLocation();
}, []);






  useEffect(() => {
    getUserLocation();
  }, []);

  // const getUserProfile = useSelector((state) => state.getUserProfile);
  // const customerType = useSelector((state) => state.customerType);
  // const {isArtist} = customerType;
  //CLOGGEND IN USERTYPE
  // const userLogin = useSelector((state) => state.userLogin);
  // const {type: userType} = userLogin;

  // const dispatch = useDispatch(dispatch);
  // REF FRO BOTTOM SHEET
  const Bs = useRef(null);

  const fall = new Animated.Value(1);
  // BOTTOM SHEET CONTENT
  const renderContent = () => <BottomSheets onPress={Bs} />;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <BottomSongModal navigating={props.navigation} />
      {/* BOTTOM SHEET */}
      <BottomSheet
        ref={Bs}
        snapPoints={[200, 0]}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        borderRadius={10}
        renderContent={renderContent}
      />
      <ArtistPostModal
        visible={artistPostModal}
        closePostModal={closePostModal}
        postPics={postPics}
        postSong={postSong}
        choosePostsPics={val => choosePostsPics(val)}
        choosePostsSong={val => choosePostsSong(val)}
      />
      {/* COMMENT MODAL */}
      {/* <Comment_Modal/> */}
      {type === 'ARTIST' && <HomeAddButton onPress={() => openPostModal()} />}

      {/* CONTENT */}
      <Animated.View
        style={{
          // paddingHorizontal: 20,
          marginTop: 10,
          width,
          flex: 1,
          opacity: Animated.add(0.1, Animated.multiply(fall, 0.9)),
        }}>
        <HomeProfile />
        <ScrollView
          contentContainerStyle={{paddingTop: 30, paddingHorizontal: 20}}>
          {/* <Loader/> */}
          {/* <HomeInfo onPress={Bs} /> */}
          {/* <PlayContainer/> */}
          <SinglePost onPress={Bs} />
          <SinglePost onPress={Bs} />
          <SinglePost onPress={Bs} />
          <SinglePost onPress={Bs} />
          <SinglePost onPress={Bs} />
          <SinglePost onPress={Bs} />
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    position: 'relative',
    ...Platform.select({
      ios: {
        paddingTop: getStatusBarHeight() - 10,
      },
    }), // paddingTop:  10,
  },
  menu_Icon: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
