import React, {useEffect, useState} from 'react';
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
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {Formik, useFormik} from 'formik';
import * as Yup from 'yup';
import LoginBtn from '../../Components/Button/LoginBtn';
import Icons from '../../Components/IconsContainer/Icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {login, clearData} from '../../redux/actions/userActions';
import {clearRegisterError} from '../../redux/actions/artistActions';
import {useSelector, useDispatch} from 'react-redux';
import LoadingAnime from '../../Components/Loading/Loading';
import {CLEAR_USER_LOGIN_ERROR} from '../../redux/constants/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Message from '../../Components/Message/Message';
import ErrorPopUp from '../../Components/Modal/MainErrorPopUp';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

// const initialValues = {
//   username: '',
//   password: '',
// };
// const validationSchema = Yup.object({
//   username: Yup.string().required('Username / Email is required'),
//   password: Yup.string()
//     .required('Password is required')
//     .min(6, 'Password should be more than 5 charcaters'),
// });

const LoginScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clientErr, setClientErr] = useState('');
  const [googleErr, setGoogleErr] = useState('');
  // const formik = useFormik();

  const userRegister = useSelector((state) => state.userRegister);
  const [userData, setUserData] = useState(false);
  const {message, status} = userRegister;
  const artistRegister = useSelector((state) => state.artistRegister);
  const {error: artistError, message: artistMessage} = artistRegister;

  const {error, loading} = userLogin;
  // console.log(navigation);
  // console.log(route);
  // ACCESS TOKEN
  const getAccessToken = useSelector((state) => state.getAccessToken);
  // console.log(getAccessToken);
  const {error: accessTokenError, accessToken} = getAccessToken;

  //CUSTOMER TYPE
  const customerType = useSelector((state) => state.customerType);
  const {isArtist} = customerType;

  const setGoggleDetails = (email) => {
    initialValues.username = email;
  };
  const chooseUserInfo = (user) => {
    setEmail(user.email);
  };

  const onSubmitValues = () => {
    if (email || password) {
      Keyboard.dismiss;
      setClientErr('');
      dispatch(clearData());
      dispatch(clearRegisterError());
      dispatch(login(email, password));
      setUserData(false);
      setEmail('');
      setPassword('');
      // actions.resetForm();
    } else {
      setClientErr('Please provide your login details');
    }
    setUserData(true);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = useState(true);

  const changePage = () => {
    // if (isArtist) {
    navigation.push('Artist_SignIn');
    // } else {
    //   navigation.push('SignIn');
    // }
  };

  const togglePassword = () => {
    setVisible(!visible);
    setShowPassword(!showPassword);
  };
  let userSuccessView = null;
  if (message) {
    userSuccessView = <Message color="success">{message}</Message>;
  }
  let artistSuccessView = null;
  if (artistMessage) {
    artistSuccessView = <Message color="success">{artistMessage}</Message>;
  }
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.content}>
          <ErrorPopUp
            errorState={error}
            clearError={() => dispatch({type: CLEAR_USER_LOGIN_ERROR})}
            // clearClientsErr={() => dispatch({type: CLEAR_USER_LOGIN_ERROR})}
            clearTime={5000}>
            {error}
          </ErrorPopUp>
          <ErrorPopUp
            errorState={clientErr}
            clearTime={3000}
            clearError={() => setClientErr('')}>
            {clientErr}
          </ErrorPopUp>
          {/* <ErrorPopUp
            errorstate={googleErr}
            clearTime={2000}
            clearError={() => setGoogleErr('')}>
            {googleErr}
          </ErrorPopUp> */}
          <StatusBar backgroundColor="#000" barStyle="light-content" />
          {/* <ScrollView
            bounces={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 30,
              alignItems: 'center',
              marginTop: '30%',
              // justifyContent: 'center',
              flex: 1,
            }}> */}
          <Image
            source={require('../../assests/images/Logo2.png')}
            style={{width: 120, height: 120}}
          />
          {/* {userSuccessView} */}
          {/* {artistSuccessView} */}
          {/* {error && <Message color="danger">{error}</Message>} */}

          {loading && <LoadingAnime width={70} height={70} />}
          <>
            <View style={{width: '100%'}}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.textInput}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#484848"
                  value={email}
                  onChangeText={(val) => setEmail(val)}
                  onFocus={() => setClientErr('')}
                  // value={formik.values.username}
                  // onChangeText={formik.handleChange('username')}
                  // onBlur={formik.handleBlur('username')}
                  style={{color: '#fff', width: '100%'}}
                />
              </View>
            </View>
            {/* PASSWORD INPUT */}
            <View style={{width: '100%', marginBottom: 10}}>
              <Text style={styles.label}>Password:</Text>
              <View style={styles.textInput}>
                <TextInput
                  placeholder="password"
                  secureTextEntry={visible}
                  placeholderTextColor="#484848"
                  onFocus={() => setClientErr('')}
                  value={password}
                  onChangeText={(val) => setPassword(val)}
                  textContentType={!showPassword ? 'name' : 'password'}
                  style={{color: '#fff', width: '100%'}}
                />
                {!showPassword ? (
                  <Icon
                    name="eye-slash"
                    size={20}
                    style={styles.inputIcon}
                    onPress={togglePassword}
                  />
                ) : (
                  <Icon
                    name="eye"
                    size={20}
                    style={styles.inputIcon}
                    onPress={togglePassword}
                  />
                )}
              </View>
            </View>
            {/* LOGIN BTN */}
            <View style={{width: '100%', marginTop: '5%'}}>
              <LoginBtn title="Login" onPress={() => onSubmitValues()} />
            </View>
          </>

          {/* <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => onSubmitValues(values, actions)}
            
          >
            {(formik) => {
              console.log(formik, 'FORMIK');
              return (
               
              );
            }}
          </Formik> */}
          <View style={styles.otherContent}>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.forgetText}>Forget Password ?</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              // marginTop: 5,
              alignSelf: 'center',
              width: '100%',
            }}>
            <Text style={styles.or}>OR</Text>
            {/* SOCIAL ICONS */}
            <View style={styles.icons}>
              <Icons
                chooseUserInfo={(val) => chooseUserInfo(val)}
                chooseGoogleErr={(val) => setGoogleErr(val)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                // marginTop: hp('100%') - hp('10%'),
                justifyContent: 'center',
                // position: 'absolute',
                // top: hp('95%'),
                // alignSelf: 'center',
                marginTop: '10%',
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
                Don't have an account ?
              </Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => changePage()}>
                <Text
                  style={{
                    color: '#f68128',
                    fontFamily: 'Helvetica-Bold',
                    fontSize: 13,
                    letterSpacing: 0.5,
                  }}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* </ScrollView> */}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

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
    marginTop: '15%',
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
    // bottom: 20,
  },
  textInput: {
    borderColor: '#161616',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    width: '100%',
    borderRadius: 5,
    padding: 5,
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
    textAlign: 'right',
    fontFamily: 'Gilroy-light',
    fontSize: 13,
    marginTop: '1%',
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
  or: {
    color: '#fff',
    marginVertical: '5%',
    textAlign: 'center',
    fontSize: 12,
  },
  icons: {
    width: '100%',
    alignItems: 'center',
  },
});
