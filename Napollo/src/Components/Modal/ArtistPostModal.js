import React, {useEffect, useState, Component, PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  // Modal,
  TextInput,
  FlatList,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import LoginBtn from '../Button/LoginBtn';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import LoadingAnime from '../../Components/Animations/Small_LoadingAnime';
import Icon from 'react-native-vector-icons/Ionicons';
import LikeBtn from '../Button/LikeBtn';
import ReplysView from '../../screens/Comment/Component/ReplysView';
import data4 from '../../data4';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale, ScaledSheet} from 'react-native-size-matters';
import ArtistIcon from '../../Components/Icons/ArtistIcon';
import MusicIcon from '../../Components/Icons/MusicIcon';
import GalleryIcon from '../../Components/Icons/GalleryIcon';
import AlbumIcon from '../../Components/Icons/NewAlbumIcons';
import {takePictureFromGallery} from '../../utils/ImagePicker';
import GeneralModal from './GeneralModalCont';
import SongPostView from '../../screens/Home/component/PostSongView/SongPost';
import SongPostViewDesign from './components/SongPostView';
import {useSelector, useDispatch} from 'react-redux';
import {CLEAR_POST_SONG} from '../../redux/constants';
import {getLoggedInUserProfile} from '../../utils/loggedInUserType';
import {DEFAULT_IMAGE_URI} from '../../utils/ImagePicker';

const ArtistPostModal = props => {
  const dispatch = useDispatch();

  const [pics, setPics] = useState('');
  const [songsModal, setSongsModal] = useState(false);
  const choosePostSong = useSelector(state => state.choosePostSong);
  const {title, id, likeCount, hitCount, image, artist} = choosePostSong;
  const artistData = getLoggedInUserProfile('ARTIST');
  const listenerData = getLoggedInUserProfile('LISTENER');

  const {
    artistProfile: {profilePictureUrl: artistPics},
  } = artistData;
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
    },
  } = listenerData;

  const openSongsModal = () => {
    setSongsModal(true);
  };
  const closeSongsModal = () => {
    setSongsModal(false);
  };
  const closeandClear = () => {
    props.closePostModal();
    dispatch({type: CLEAR_POST_SONG});
    setPics('');
  };

  const submitPost = () => {
    props.closePostModal();
    dispatch({type: CLEAR_POST_SONG});
    setPics('');
  };

  const choosePics = async () => {
    dispatch({type: CLEAR_POST_SONG});
    const image = await takePictureFromGallery();
    setPics(image?.path);
    console.log(image, 'POST IMAGE');
  };
  const chooseSong = () => {
    setPics('');
    setSongsModal(true);
  };

  let galleryView = null;
  let songView = null;
  if (pics || pics !== '') {
    galleryView = (
      <View style={styles.gallery}>
        <Image source={{uri: pics}} style={{width: '100%', height: '100%'}} />
      </View>
    );
  }
  if (title || title !== '') {
    songView = (
      <View style={styles.songView}>
        <Image
          source={{uri: image}}
          style={{
            height: '100%',
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            marginRight: 10,
            width: '30%',
          }}
        />
        <View>
          <Text numberOfLines={1} style={styles.songTitle}>
            {title}
          </Text>
          <Text numberOfLines={1} style={styles.artist}>
            {artist}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.listner}>
              <Icon
                name="headset"
                color="#fff"
                size={13}
                style={{marginRight: 5}}
              />
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Helvetica-Medium',
                  fontSize: 12,
                  textTransform: 'capitalize',
                }}>
                {/* {hitCount} */}
                {hitCount}
              </Text>
            </View>
            <Text numberOfLines={1} style={styles.like}>
              {likeCount} Likes
            </Text>
          </View>
        </View>
      </View>
    );
  }

  // const galleryView = (
  //   <View style={styles.gallery}>
  //     <Image source={pics} style={{width: '100%', height: 70}} />
  //   </View>
  // );

  return (
    <Modal
      animationType="slide"
      swipeDirection="down"
      transparent={true}
      visible={props.visible}
      style={{
        flex: 1,
        marginLeft: 0,
        marginRight: 0,
        // height,
        marginTop: 0,
        marginBottom: 0,
        // position: 'absolute',
        // bottom: 0,
      }}
      onRequestClose={() => props.closePostModal()}
      onSwipeComplete={() => props.closePostModal()}>
      <View style={styles.modalView}>
        <GeneralModal
          // bg="#000"
          visible={songsModal}
          closeModal={closeSongsModal}>
          <SongPostView closeModal={closeSongsModal} />
        </GeneralModal>
        <TouchableOpacity
          hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
          activeOpacity={0.8}
          onPress={() => closeandClear()}
          style={styles.closeBtn}>
          <Icon name="close-circle-outline" size={30} color="#f68128" />
        </TouchableOpacity>
        <View
          style={[
            styles.inputCont,
            pics || pics !== '' ? {height: '50%'} : {height: '35%'},
          ]}>
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
          <View style={styles.secondCont}>
            <TextInput
              multiline={true}
              placeholder="Share something with your fans"
              placeholderTextColor="#999"
              style={{
                color: '#eee',
                minHeight: 50,
                fontFamily: 'Helvetica-Medium',
              }}
            />
            {galleryView}
            {songView}
            <View style={styles.postType} />
            {/* POST CHOICES VIEW */}
            <View style={styles.postChoice}>
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.singleIcon}
                  onPress={() => choosePics()}>
                  <GalleryIcon color="#999" width={20} height={20} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => chooseSong()}
                  activeOpacity={0.8}
                  style={styles.singleIcon}>
                  <MusicIcon color="#999" width={20} height={20} />
                </TouchableOpacity>
                {/* <TouchableOpacity activeOpacity={0.8} style={styles.singleIcon}>
                  <AlbumIcon color="#999" width={20} height={20} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.singleIcon}>
                  <ArtistIcon color="#999" width={20} height={20} />
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </View>
        {/* POST TYPE */}
        <View style={{width: '100%', alignItems: 'flex-end', marginTop: 30}}>
          <LoginBtn
            title="Post"
            width="25%"
            height="40%"
            textSize={11}
            onPress={() => submitPost()}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ArtistPostModal;

const styles = ScaledSheet.create({
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#1A1A1A',
    height: '100%',
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10,
    zIndex: 500,
    padding: 15,
    // flex: 1,
  },
  inputCont: {
    width: '100%',
    flexDirection: 'row',
    // flex: 1,
    marginTop: 20,
    // backgroundColor: '#fff',
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    marginRight: 10,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() - 10 : 0,
  },
  postChoice: {
    width: '100%',
    // marginTop: 20,
    // paddingLeft: '10%',
    flexDirection: 'row',
    marginHorizontal: 10,
    // backgroundColor: '#fff',
    minHeight: 30,
    // marginVertical: 10,
  },
  singleIcon: {
    marginRight: 30,
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  secondCont: {
    borderWidth: 0.5,
    borderColor: '#777',
    paddingLeft: 10,
    borderRadius: 10,
    width: '80%',
    justifyContent: 'space-between',
    paddingBottom: 20,
    minHeight: '100%',
    paddingRight: 10,
  },
  gallery: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  songView: {
    width: '100%',
    height: 80,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.061)',
  },
  songTitle: {
    color: '#eee',
    fontFamily: 'Helvetica-Medium',
    fontSize: 16,
  },
  artist: {
    color: '#F68128',
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
  },
  like: {
    color: '#eee',
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
    marginTop: 5,
  },
  thumbNail: {
    width: '50@s',
    height: '50@s',
    borderRadius: 100 / 2,
    backgroundColor: '#555',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5@s',
  },
  thumbNailName: {
    fontSize: '15@s',
    color: '#eee',
    fontFamily: 'Helvetica-Bold',
  },
  profileImage: {
    width: '50@s',
    height: '50@s',
    borderRadius: '50@s',
    marginRight: '5@s',
  },
  listner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginTop: 5,
  },
});
