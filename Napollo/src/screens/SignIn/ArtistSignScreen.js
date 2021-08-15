import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as Yup from 'yup';
import LoginBtn from '../../Components/Button/LoginBtn';
import Icons from '../../Components/IconsContainer/Icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MyDarkView from './component/countrySelector';
import Message from '../../Components/Message/Message';
import {useDispatch, useSelector} from 'react-redux';
import {
  artistRegister,
  clearRegisterError,
} from '../../redux/actions/artistActions';
import {register} from '../../redux/actions/userActions';
import {getGenres} from '../../redux/actions/getGenreActions';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {
  CLEAR_REGISTER_ERROR,
  CLEAR_REGISTER_DATA,
} from '../../redux/constants/index';
import LoadingAnime from '../../Components/Loading/Loading';
import NetworkError from '../NetworkErrorScreen.js/NetworkError';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import StepIndicator from './component/StepIndicator';
import ArtsitStep1 from './component/SignUpSteps/ArtsitStep1';
import ArtsitFinalStep from './component/SignUpSteps/ArtistFinalStep';
import GenreModal from '../../Components/Modal/GenreModal';
import Data from 'city-state-country';
import {Country, State} from 'country-state-city';
import ErrorPopup from '../../Components/Modal/MainErrorPopUp';
import SuccessPopUp from '../../Components/Modal/MainSuccessPopUp';
import moment from 'moment';
import CustomDatePicker from './component/DatePickerModal';

const SignInScreen = () => {
  const [position, setPosition] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [bookingNumber, setBookingNumber] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('United States');
  const [city, setCity] = useState('');
  const [genres, setGenres] = useState([]);
  const [stageName, setStageName] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [countryShortCode, setCountryShortCode] = useState('');
  const [genreModal, setGenreModal] = useState(false);
  const [clientErr, setClientErr] = useState('');
  const [website, setWebsite] = useState('');
  const [genreType, setGenreType] = useState([]);
  const [statesData, setStatesData] = useState([]);
  const [dob, setDOB] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [googleErr, setGoogleErr] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();
  console.log(countryShortCode, 'USER SHORT CODE');
  const onPageChange = () => {
    // console.log(countryShortCode,'USER SHORT CODE')
    setPosition(position + 1);
  };
  const previousPage = () => {
    setPosition(position - 1);
  };
  const changeCountryCode = (val) => {
    const plus = '+';
    const result = plus.concat(val);
    setCountryCode(result);
  };
  // SELECT DATE OF BIRTH
  const chooseDOB = (date) => {
    setDOB(date);
  };

  //MODALS
  const openGenreModal = () => {
    setGenreModal(true);
  };
  const closeGenreModal = () => {
    setGenreModal(false);
  };
  console.log('DATE PICKED', dob);
  const openDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };
  const closeDatePicker = () => {
    setShowDatePicker(false);
  };

  //ADD TO GENRE
  console.log('GENRES', genres);
  const addToGenre = (val, index) => {
    if (!genres.includes(genres[index])) {
      setGenres((previousArr) => [...previousArr, {genreIdentity: val}]);
    } else {
      setGenres((previousArr) => [...previousArr.filter((x) => x !== val)]);
    }
  };
  const userRegister = useSelector((state) => state.userRegister);
  // const {error, status, loading, message} = artistRegisters;
  const {error, status, loading, message} = userRegister;

  console.log(
    firstName,
    'FIRSTName',
    lastName,
    'lastName',
    emailAddress,
    'emailAddress',
    password,
    stageName,
    website,
    city,
    countryShortCode,
    // address,
    dob,
  );

  const submitForm = () => {
    const phoneNumber = countryCode.concat(bookingNumber);

    setClientErr('');
    if (
      firstName ||
      lastName ||
      emailAddress ||
      phoneNumber ||
      stageName ||
      city ||
      countryShortCode ||
      dob
    ) {
      dispatch(
        register(
          firstName,
          lastName,
          emailAddress,
          phoneNumber,
          stageName,
          password,
          website,
          city,
          countryShortCode,
          dob,
        ),
      );
      setFirstName('');
      setLastName('');
      setEmailAddress('');
      setBookingNumber('');
      setPassword('');
      setAddress('');
      setCity('');
      setCountryShortCode('');
      setDOB('');
    } else {
      setClientErr('All fields are required');
    }
  };

  const chooseUserInfo = (user) => {
    setFirstName(user.givenName);
    setLastName(user.familyName);
    setEmailAddress(user.email);
    // setEmail(user.email);
  };
  useEffect(() => {
    if (status && status === true) {
      setTimeout(() => {
        navigation.navigate('EmailVerification');
      }, 2000);
    }
  }, [status]);

  useEffect(() => {
    if (countryShortCode != '') {
      const data = State.getStatesOfCountry(countryShortCode);
      if (data) {
        setStatesData(data);
      }
    }
  }, [countryShortCode]);

  let errorView = null;
  let loadingView = null;
  let clientErrView = null;
  let messageView = null;
  if (error) {
    errorView = (
      <ErrorPopup
        errorstate={error}
        clearTime={4000}
        clearError={() => dispatch({type: CLEAR_REGISTER_ERROR})}>
        {error}
      </ErrorPopup>
    );
  }
  if (loading) {
    loadingView = <LoadingAnime width={70} height={70} />;
  }
  if (clientErr) {
    clientErrView = (
      <ErrorPopup
        errorstate={clientErr}
        clearTime={4000}
        clearError={() => setClientErr('')}>
        {clientErr}
      </ErrorPopup>
    );
  }

  if (message) {
    messageView = (
      <SuccessPopUp
        successState={message}
        clearTime={2000}
        clearSuccess={() => dispatch({type: CLEAR_REGISTER_ERROR})}>
        {message}
      </SuccessPopUp>
    );
  }

  return (
    <KeyboardAwareScrollView
      // behavior={Platform.OS == 'ios' ? 'height' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {errorView}
          {messageView}
          {clientErrView}
          {/* <ErrorPopup
            errorstate={googleErr}
            clearTime={2000}
            clearError={() => setGoogleErr('')}>
            {googleErr}
          </ErrorPopup> */}
          <GenreModal
            genreModal={genreModal}
            closeGenreModal={closeGenreModal}
            genreType={genreType}
            chooseGenre={(val, index) => addToGenre(val, index)}
            genres={genres}
            data={statesData}
            artistState={city}
            chooseState={(val) => setCity(val)}
          />

          {/* <CustomDatePicker
            visible={showDatePicker}
            closeModal={closeDatePicker}
            chooseDateOfBirth={(val) => chooseDOB(val)}
            dob={dob}
          /> */}

          <View style={styles.content}>
            <View
              style={{
                justifyContent: 'center',
                position: 'absolute',
                top: hp('75%'),
                alignSelf: 'center',
                flex: 1,
              }}>
              <View style={styles.otherContent}>
                <Text style={styles.or}>OR</Text>

                <View style={styles.icons}>
                  <Icons
                    chooseUserInfo={(val) => chooseUserInfo(val)}
                    chooseGoogleErr={(val) => setGoogleErr(val)}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: '3%',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Helvetica-Regular',
                    textAlign: 'center',
                    fontSize: 13,
                    letterSpacing: 0.5,
                    marginRight: 5,
                  }}>
                  Already have an account ?
                </Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => navigation.push('Login')}>
                  <Text
                    style={{
                      color: '#f68128',
                      fontFamily: 'Helvetica-Medium',
                      fontSize: 13,
                      letterSpacing: 0.5,
                    }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <View
              style={{width: '100%', marginBottom: 10, alignItems: 'center'}}>
              <Image
                source={require('../../assests/images/Logo2.png')}
                style={{width: 110, height: 110}}
              />
            </View>
            {/* STEP INDICATOR */}
            <View style={styles.indicator}>
              <StepIndicator
                position={position}
                changePosition={onPageChange}
              />
            </View>

            {loadingView}
            <View style={styles.formView}>
              {position === 0 && (
                <ArtsitStep1
                  firstName={firstName}
                  lastName={lastName}
                  emailAddress={emailAddress}
                  onChangeFirstName={(val) => setFirstName(val)}
                  onChangeLastName={(val) => setLastName(val)}
                  onChangeEmailAddress={(val) => setEmailAddress(val)}
                  changePage={onPageChange}
                  onChangeStageName={(val) => setStageName(val)}
                  stageName={stageName}
                  visible={showDatePicker}
                  closeModal={closeDatePicker}
                  openModal={openDatePicker}
                  chooseDateOfBirth={(val) => chooseDOB(val)}
                  dob={dob}
                />
              )}

              {position > 0 && (
                <ArtsitFinalStep
                  bookingNumber={bookingNumber}
                  password={password}
                  address={address}
                  city={city}
                  genres={genres}
                  stageName={stageName}
                  countryShortCode
                  changeCountryShortCode={(val) => setCountryShortCode(val)}
                  onChangeStageName={(val) => setStageName(val)}
                  onChangeGeneres={(val) => setGenres(val)}
                  onChangeBookingNumber={(val) => setBookingNumber(val)}
                  onChangePassword={(val) => setPassword(val)}
                  onChangeAddress={(val) => setAddress(val)}
                  onChangeCity={(val) => setCity(val)}
                  changePage={previousPage}
                  submitForm={submitForm}
                  changeCountryCode={changeCountryCode}
                  openGenreModal={openGenreModal}
                />
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: '#000000',
  },
  content: {
    paddingHorizontal: 20,
    // paddingTop: 70,
    width: wp('100%'),
    height: hp('100%'),
    paddingBottom: 30,
    alignItems: 'center',
    marginTop: '10%',
    // marginTop: hp('5%'),
    // justifyContent: 'center',
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  otherContent: {
    width: '100%',
    alignSelf: 'center',
    // bottom: 20,
  },
  textInput: {
    borderColor: '#161616',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    width: '100%',
    borderRadius: 5,
    paddingLeft: 5,
    fontFamily: 'Gilroy-light',
    backgroundColor: '#161616',
    textTransform: 'uppercase',
    position: 'relative',
    height: 50,
    marginBottom: 10,
  },
  label: {
    color: '#D3D3D3',
    paddingHorizontal: 5,
    marginVertical: 5,
    fontFamily: 'Gilroy-light',
    alignSelf: 'flex-start',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  forgetText: {
    color: '#484848',
    textAlign: 'center',
    fontFamily: 'Gilroy-light',
    fontSize: 15,
  },
  errorText: {
    color: '#900',
    fontSize: 10,
    margin: 3,
    textTransform: 'capitalize',
  },

  inputIcon: {
    position: 'absolute',
    top: 14,
    right: 20,
    color: '#f68126',
  },
  countryStyle: {
    justifyContent: 'center',
    marginRight: 10,
  },
  or: {
    color: '#fff',
    marginVertical: '3%',
    textAlign: 'center',
    fontSize: 12,
  },
  icons: {
    width: '100%',
    alignSelf: 'center',
  },
  indicator: {
    width: '100%',
    marginBottom: '5%',
    // height: '20%',
  },
  formView: {
    width: '100%',
    alignItems: 'center',
  },
});
