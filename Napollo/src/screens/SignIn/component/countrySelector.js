import React, {useState, useRef} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/Ionicons';

const MyDarkView = (props) => {
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [countryCode, setCountryCode] = useState('US');
  const [country, setCountry] = useState(null);
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [withFlag, setWithFlag] = useState(true);
  const [withEmoji, setWithEmoji] = useState(true);
  const [withFilter, setWithFilter] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(false);
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [myCallingCode, setMyCallingCode] = useState('1');

  const selectCallingCode = (val) => {
    setMyCallingCode(val);
  };
  const onSelect = (country) => {
    console.log(country.callingCode[0], 'Calling code');
    props.changeCountryCode(country.callingCode[0]);
    props.changeCountryShortCode(country.cca2);
    selectCallingCode(country.callingCode[0]);
    setCountryCode(country.cca2);
    setCountry(country);
    props.changeCountry(country.name);
    console.log(country.cca2, 'COUNTRY');
  };

  const phoneRef = useRef('phone');
  //   const countryRef = useRef('countryPicker');
  //   console.log(countryRef);
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => setShowCountryModal(!showCountryModal)}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* <View style={{width: '20%'}}> */}
      {/* <PhoneInput
          ref={(ref) => {
            phoneRef = ref;
          }}
        /> */}
      <CountryPicker
        //   ref={(ref) => {
        //     countryRef = ref;   
        //   }}
        theme={DARK_THEME}
        {...{
          countryCode,
          withFilter,
          withFlag,
          withCountryNameButton,
          withAlphaFilter,
          withCallingCode,
          withEmoji,
          onSelect,
        }}
        visible={showCountryModal}
      />
      {countryCode && (
        <Text style={{color: '#f68128', fontSize: 15}}>
          {' '}
          +{myCallingCode || countryCode}
        </Text>
      )}
      {/* </View> */}
    </TouchableOpacity>
  );
};

export default MyDarkView;
