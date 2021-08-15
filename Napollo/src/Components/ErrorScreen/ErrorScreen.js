import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import LoginBtn from '../../Components/Button/LoginBtn';

const {width, height} = Dimensions.get('window');

const ErrorScreen = ({onPress, errorTitle, clearError}) => {
  useEffect(() => {
    if (clearError) {
      setTimeout(() => {
        clearError();
      }, 2000);
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.largeText}>OOPS!</Text>
      <Text style={styles.messageText}>
        {errorTitle ? errorTitle : 'You are not connected to the internet'}
      </Text>
      <View style={{width: '80%', marginTop: 50}}>
        <LoginBtn
          title="TRY AGAIN"
          onPress={onPress ? () => onPress() : null}
        />
      </View>
    </View>
  );
};

export default ErrorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 1000,
  },
  largeText: {
    color: '#f68128',
    fontSize: 55,
    textTransform: 'uppercase',
    fontFamily: 'Gilroy-ExtraBold',
  },
  messageText: {
    color: '#999',
    fontSize: 15,
    textTransform: 'capitalize',
    marginVertical: 20,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});
