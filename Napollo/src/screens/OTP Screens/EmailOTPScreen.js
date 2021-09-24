import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
  verify_Email,
  resend_Email_Otp,
} from '../../redux/actions/OtpActions/index';
import {login} from '../../redux/actions/userActions';
import {CLEAR_OTP_STATUSES} from '../../redux/constants/index';
import {useSelector, useDispatch} from 'react-redux';
import MainSuccessPopUp from '../../Components/Modal/MainSuccessPopUp';
import MainErrorPopUp from '../../Components/Modal/MainErrorPopUp';
import LoadingAnime from '../../Components/Loading/Loading';
import CommonHeader from '../../Components/CustomHeader/CommonHeader';
import Button from '../../Components/Button/LoginBtn';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const EmailOTPScreen = () => {
  const navigation = useNavigation();
  let textInput = useRef(null);
  const dispatch = useDispatch();
  const storeUserRegisterData = useSelector(
    (state) => state.storeUserRegisterData,
  );
  const resendEmailOtp = useSelector((state) => state.resendEmailOtp);

  const verifyEmail = useSelector((state) => state.verifyEmail);
  const {userEmail, userPassword} = storeUserRegisterData;
  const userLogin = useSelector((state) => state.userLogin);
  const {token} = userLogin;
  const {
    loading: verifyLoading,
    error: verifyError,
    message: verifyMessage,
    status: verifyStatus,
  } = verifyEmail;
  // const {userEmail} = storeUserRegisterData;
  const {
    loading: resendLoading,
    error: resendError,
    message: resendMessage,
    status: resendStatus,
  } = resendEmailOtp;
  const inputLength = 6;
  const [otp, setOtp] = useState('');
  const [focusedInput, setFocusedInput] = useState(false);

  console.log(otp, 'OTP');

  const resendOtpToEmail = () => {
    setOtp('');
    dispatch(resend_Email_Otp(userEmail));
  };

  useEffect(() => {
    textInput.current.focus();
    // textInput.focus();
  }, []);

  const onChangeOtp = (val) => {
    setOtp(val);
  };
  const resenedMail = () => {
    setOtp('');
    textInput.current.focus();
  };

  useEffect(() => {
    if (otp.length === inputLength) {
      // alert('Done');
      Keyboard.dismiss();
      dispatch(verify_Email(userEmail, otp));
      setOtp('');
    }
  }, [otp]);

  useEffect(() => {
    if (verifyStatus && verifyStatus === true) {
      dispatch(login(userEmail, userPassword));
      setTimeout(() => {
        navigation.navigate('Login');
      }, 1000);
    }
      return () => clearTimeout();
  }, [verifyStatus]);

  let resendBtnView = null;
  let verifyLoadingView = null;

  if (resendLoading) {
    resendBtnView = <ActivityIndicator color="#fee33e" size="small" />;
  } else {
    resendBtnView = (
      <TouchableOpacity activeOpacity={0.7} onPress={() => resendOtpToEmail()}>
        <Text style={styles.resendText}>Resend code </Text>
      </TouchableOpacity>
    );
  }
  if (verifyLoading) {
    verifyLoadingView = <LoadingAnime width={70} height={70} />;
  }

  return (
    <View style={styles.container}>
      <MainErrorPopUp
        clearTime={3000}
        errorState={resendError}
        clearError={() => dispatch({type: CLEAR_OTP_STATUSES})}>
        {resendError}
      </MainErrorPopUp>
      <MainErrorPopUp
        clearTime={3000}
        errorState={verifyError}
        clearError={() => dispatch({type: CLEAR_OTP_STATUSES})}>
        {verifyError}
      </MainErrorPopUp>
      <MainSuccessPopUp
        clearTime={3000}
        successState={resendMessage}
        clearSuccess={() => dispatch({type: CLEAR_OTP_STATUSES})}>
        {resendMessage}
      </MainSuccessPopUp>
      <MainSuccessPopUp
        clearTime={3000}
        successState={verifyMessage}
        clearSuccess={() => dispatch({type: CLEAR_OTP_STATUSES})}>
        {verifyMessage}
      </MainSuccessPopUp>
      <View style={styles.header}>
        <Text
          style={{
            color: '#fff',
            fontSize: 17,
            width: '80%',
            textAlign: 'center',
            fontFamily: 'Helvetica-Medium',
          }}>
          Email Verification
        </Text>
      </View>
      {verifyLoadingView}
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={styles.avoidingView}>
        <Text style={styles.title}>Please input the code sent via email </Text>
        <View style={{width: '100%', alignItems: 'center'}}>
          <TextInput
            ref={textInput}
            // ref={(input) => (textInput = input)}
            keyboardType="numeric"
            style={[
              styles.input,
              focusedInput === true
                ? {
                    borderBottomColor: '#F68128',
                  }
                : {borderBottomColor: '#999'},
            ]}
            onFocus={() => setFocusedInput(true)}
            // style={{width: 0, height: 0}}
            secureTextEntry={false}
            maxLength={inputLength}
            value={otp}
            onChangeText={onChangeOtp}
            returnKeyType="done"
          />
          {/* <View style={styles.containerInput}>
            {Array(inputLength)
              .fill()
              .map((item, index) => (
                <TouchableOpacity
                  key={index}
                  hitSlop={{top: 5, left: 5, bottom: 5}}
                  onPress={() => textInput.current.focus()}
                  activeOpacity={0.7}
                  style={[
                    styles.cellView,
                    {
                      borderBottomColor:
                        index === otp.length ? '#999' : '#f68128',
                    },
                  ]}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => textInput.current.focus()}>
                    <Text style={styles.cellText}>
                      {otp && otp.length > 0 ? otp[index] : ''}
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
          </View> */}
          <View style={styles.resendContainer}>{resendBtnView}</View>
        </View>
        {/* <View style={styles.bottomView}>
          <View style={{width: '100%'}}>
            <View style={{width: '50%', alignSelf: 'center'}}>
              <Button title="Verify mail" />
            </View>
          </View>
        </View> */}
        {/* <View style={styles.btnView}>
          <View style={{width: '50%', alignSelf: 'center'}}>
            <Button title="Verify mail" />
          </View>
        </View>
        <View style={styles.resendContainer}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => resenedMail()}>
            <Text style={styles.resendText}>Resend mail </Text>
          </TouchableOpacity>
        </View> */}
      </KeyboardAvoidingView>
    </View>
  );
};

export default EmailOTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 60,
    backgroundColor: '#000',
    height,
    width: '100%',
    ...Platform.select({
      ios: {
        paddingTop: getStatusBarHeight() - 10,
      },
    }),
    // paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderBottomColor: '#1A1A1A',
    borderWidth: 1,
  },
  avoidingView: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    // height,
    // justifyContent: 'center',
  },
  title: {
    color: '#eee',
    fontFamily: 'Helvetica-Medium',
    marginTop: '10%',
    marginBottom: '5%',
    fontSize: 17,
  },
  containerInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellView: {
    paddingVertical: 8,
    margin: 5,
    alignItems: 'center',
    width: 40,
    justifyContent: 'center',
    borderBottomWidth: 1.5,
    // borderBottomColor: '#F68128',
  },
  cellText: {
    color: '#fff',
    fontFamily: 'Helvetica-Medium',
    fontSize: 18,
    textAlign: 'center',
  },
  resendContainer: {
    width: '30%',
    // alignItems: 'flex-end',
    flexDirection: 'row',
    marginVertical: '10%',
    alignSelf: 'flex-end',
    // borderBottomWidth: 0.5,
    // borderBottomColor: '#feee3e',
    paddingVertical: 3,
  },
  resendText: {
    color: '#feee3e',
    fontFamily: 'Helvetica-Medium',
    fontSize: 13,
  },
  btnView: {
    width: '100%',
    alignSelf: 'center',
    marginTop: '50%',
    // position: 'absolute',
    // bottom: '30%',
  },
  bottomView: {
    flex: 1,
    marginBottom: '20%',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  input: {
    width: '80%',
    color: '#fff',
    fontFamily: 'Helvetica-Medium',
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    // paddingHorizontal: 10,
    // borderBottomColor: '#f',
  },
});
