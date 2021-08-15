import Share from 'react-native-share';
import base64 from 'react-native-base64';
import {DEFAULT_IMAGE_URI} from './ImagePicker'

export const SharePost = async (options) => {
  try {
    const res = await Share.open({
      message: options.message,
      // url: `data:${options.type};base64/${base64.encode(options.url)}`,
      url: `${DEFAULT_IMAGE_URI}`,
    });
    return res;
  } catch (error) {
    console.log(error, 'SHARE ERROR');
    return error;
  }
};
