import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import CustomHeader from '../../Components/CustomHeader/CommonHeader';
import {alphaBets} from '../../data5';
import SingleFilterView from '../Artists/component/SingleFilterView';

const {width, height} = Dimensions.get('window');

const AlbumScreen = () => {
  const [filter, setFilter] = useState(false);
  const [filterValue, setFilterValue] = useState('All');
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <CustomHeader title="Albums" />
          <View style={styles.content}>
            {!filter && (
              <View style={styles.filterStyle}>
                <SingleFilterView
                  title="All"
                  value={filterValue}
                  onPress={() => setDefaultData()}
                />
                <FlatList
                  contentContainerStyle={{
                    paddingBottom: 10,
                  }}
                  data={alphaBets}
                  horizontal={true}
                  keyExtractor={(item) => String(item.id)}
                  renderItem={({item}) => (
                    <>
                      <SingleFilterView
                        {...item}
                        value={filterValue}
                        onPress={() => chooseFilterValue(item.title)}
                      />
                    </>
                  )}
                />
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AlbumScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
  },
  content: {
    width,
    flex: 1,
    height,
    paddingHorizontal: 25,
  },
  filterStyle: {
    // paddingLeft: 5,
    // height: 50,
    paddingTop: 15,
    flexDirection: 'row',
  },
});
