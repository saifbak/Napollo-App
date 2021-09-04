import {
  VERIFY_USER_EMAIL_FAIL,
  VERIFY_USER_EMAIL_LOADING,
  VERIFY_USER_EMAIL_SUCCESS,
  VERIFY_USER_PHONE_NUMBER_FAIL,
  VERIFY_USER_PHONE_NUMBER_LOADING,
  VERIFY_USER_PHONE_NUMBER_SUCCESS,
  RESEND_EMAIL_OTP_CODE_FAIL,
  RESEND_EMAIL_OTP_CODE_LOADING,
  RESEND_EMAIL_OTP_CODE_SUCCESS,
  CLEAR_OTP_STATUSES,
  RESEND_PHONE_NUMBER_OTP_CODE_FAIL,
  RESEND_PHONE_NUMBER_OTP_CODE_LOADING,
  RESEND_PHONE_NUMBER_OTP_CODE_SUCCESS,
  CLEAR_REGISTER_DATA,
} from '../../constants/index';
import axios from 'axios';
import {BASE_URL2, MOBILE_ADMIN_USERNAME, MOBILE_ADMIN_PASSWORD} from '@env';
import {login} from '../userActions';
import {logoutUserWhenTokenExpires} from '../../../utils/loggedInUserType';


axios.defaults.timeout = 20000;
axios.defaults.timeoutErrorMessage =
  'Could not connect to server.Poor network connection';
export const verify_Email =
  (emailAddress, activationCode) => async (dispatch, getState) => {
    try {
      dispatch({
        type: VERIFY_USER_EMAIL_LOADING,
      });
      const {
        getAccessToken: {accessToken},
      } = getState();
      const {
        storeUserRegisterData: {userEmail, userPassword},
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const {data} = await axios.post(
        `${BASE_URL2}/accountuser/activation/email`,
        {emailAddress, activationCode},
        config,
      );

      dispatch({
        type: VERIFY_USER_EMAIL_SUCCESS,
        payload: data,
      });
      dispatch({
        type: CLEAR_REGISTER_DATA,
      });
      // dispatch(login(userEmail, userPassword)); 
    } catch (error) {
      dispatch({
        type: VERIFY_USER_EMAIL_FAIL,
        payload:
          error.response && error.response.data.responseDescription
            ? error.response.data.responseDescription
            : error.message,
      });
    }
  };
export const resend_Email_Otp =
  (emailAddress) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RESEND_EMAIL_OTP_CODE_LOADING,
      });
      const {
        getAccessToken: {accessToken},
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const {data} = await axios.put(
        `${BASE_URL2}/accountuser/activation/email`,
        {emailAddress},
        config,
      );

      dispatch({
        type: RESEND_EMAIL_OTP_CODE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: RESEND_EMAIL_OTP_CODE_FAIL,
        payload:
          error.response && error.response.data.responseDescription
            ? error.response.data.responseDescription
            : error.message,
      });
    }
  };
export const verify_Phone_Number =
  (mobileNumber, activationToken) => async (dispatch, getState) => {
    try {
      dispatch({
        type: VERIFY_USER_PHONE_NUMBER_LOADING,
      });
      const {
        getAccessToken: {accessToken},
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const {data} = await axios.post(
        `${BASE_URL2}/accountuser/activation/msisdn`,
        {mobileNumber, activationToken},
        config,
      );

      dispatch({
        type: VERIFY_USER_PHONE_NUMBER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // logoutUserWhenTokenExpires(
      //   dispatch,
      //   error,
      //   VERIFY_USER_PHONE_NUMBER_FAIL,
      // );
      dispatch({
        type: VERIFY_USER_PHONE_NUMBER_FAIL,
        payload:
          error.response && error.response.data.responseDescription
            ? error.response.data.responseDescription
            : error.message,
      });
    }
  };
export const resend_Phone_Number_Otp =
  (mobileNumber) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RESEND_PHONE_NUMBER_OTP_CODE_LOADING,
      });
      const {
        getAccessToken: {accessToken},
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const {data} = await axios.put(
        `${BASE_URL2}/accountuser/activation/msisdn`,
        {mobileNumber},
        config,
      );

      dispatch({
        type: RESEND_PHONE_NUMBER_OTP_CODE_SUCCESS,
        payload: data,
      });
    } catch (error) {
        // logoutUserWhenTokenExpires(
        //   dispatch,
        //   error,
        //   RESEND_PHONE_NUMBER_OTP_CODE_FAIL,
        // );
      dispatch({
        type: RESEND_PHONE_NUMBER_OTP_CODE_FAIL,
        payload:
          error.response && error.response.data.responseDescription
            ? error.response.data.responseDescription
            : error.message,
      });
    }
  };
