import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import CustomHeader from '../../../../Components/CustomHeader/CommonHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {get_Media} from '../../../../redux/actions/MediaActions/getMediaActions';
import LoadingAnime from '../../../../Components/Loading/Loading';
import MainErrorPopup from '../../../../Components/Modal/MainErrorPopUp';
import SettingSongMedia from '../../../../Components/LibrarySongs/SettingsMediaSongs';

const {width, height} = Dimensions.get('window');

const index = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);

  console.log(songTitle, 'DISCOVERED');

  const chooseSong = (val) => {
    setSongTitle(val);
  };

  useEffect(() => {
    if (artistMedias.length <= 0) {
      dispatch(get_Media(page, size));
    }
  }, []);

  const getMedia = useSelector((state) => state.getMedia);
  const {loading, error, data: artistMedias} = getMedia;

  const fiterArtistData = (val) => {
    if (val !== '') {
      const filtered = artistMedias.filter(
        (item) => item.title?.toLowerCase().indexOf(val.toLowerCase()) >= 0,
      );
      return filtered;
    } else {
      return artistMedias;
    }
  };

  let mainView = null;

  if (artistMedias.length < 0 && !loading && !error) {
    return (mainView = (
      <View style={styles.container}>
        <Text
          style={{
            color: '#fff',
            fontWeight: '800',
            fontFamily: 'Helvetica-ExtraBold',
            fontSize: scale(13),
            marginTop: 30,
            textAlign: 'center',
          }}>
          You haven't uploaded any song yet.
        </Text>
      </View>
    ));
  } else if (loading) {
    return (mainView = (
      <View style={{alignSelf: 'center', marginTop: 20}}>
        <LoadingAnime width={60} height={60} />
      </View>
    ));
  } else if (error) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => dispatch(get_Media(page, size))}>
        <Text
          style={{
            color: '#999',
            fontSize: scale(13),
            textAlign: 'center',
            marginTop: 10,
          }}>
          {error}
        </Text>
        <Text
          style={{
            color: '#F68128',
            fontSize: 10,
            textAlign: 'center',
            marginTop: scale(10),
            fontFamily: 'Helvetica-Bold',
          }}>
          Try Again
        </Text>
      </TouchableOpacity>
    );
  } else {
    mainView = (
      <FlatList
        data={fiterArtistData(searchValue)}
        keyExtractor={(item) => item.title}
        contentContainerStyle={{paddingHorizontal: 20, paddingVertical: 20}}
        renderItem={({item, index}) => (
          <SettingSongMedia
            {...item}
            allSongs={artistMedias}
            key={index}
            showLikeBtn={true}
            indexes
            index={index}
            chooseSong={(val) => chooseSong(val)}
            songTitle={songTitle}
          />
        )}
      />
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader title={`Your songs (${artistMedias.length})`} />
      <View style={styles.content}>
        <View style={styles.search}>
          <Icon
            name="search"
            color="#999"
            size={scale(20)}
            style={{width: '8%'}}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#999"
            value={searchValue}
            onChangeText={(val) => setSearchValue(val)}
            style={{
              paddingLeft: 10,
              color: '#eee',
              fontSize: scale(12),
              fontFamily: 'Helvetica-Medium',
              backgroundColor: 'transparent',
              width: '90%',
            }}
          />
        </View>
        <View style={styles.songLength}>
          <Text
            style={{
              fontSize: scale(13),
              color: '#eee',
              fontFamily: 'Helvetica-Bold',
            }}>
            Pick a song to be discovered
          </Text>
        </View>

        {mainView}
        {/* <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 30}}></ScrollView> */}
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
    paddingTop: 20,
  },
  search: {
    borderWidth: 1,
    width: '90%',
    borderRadius: 5,
    height: 45,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#555',
    borderColor: '#555',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    alignSelf: 'center',
  },
  songLength: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomColor: '#333',
    borderWidth: 0.5,
  },
});
