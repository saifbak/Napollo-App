import {Platform} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Clipboard from '@react-native-clipboard/clipboard';

const normalizePath = async (path) => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    const filePrefix = 'file://';
    if (path.startsWith(filePrefix)) {
      path = path.substring(filePrefix.length);
      try {
        path = decodeURI(path);
      } catch (error) {}
    }
  }
  return path;
};

export const pickSingleSong = async () => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.audio],
    });
    // console.log(res);
    if (res) {
      const path = await normalizePath(res.fileCopyUri);

      return {
        uri: path,
        name: res.name,
        size: res.size,
        type: res.type,
      };
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log(err);
    } else {
      throw err;
    }
  }
};
export const pickSinglePicture = async () => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    });
    // console.log(res);
    if (res) {
      const path = await normalizePath(res.fileCopyUri);

      return {
        uri: path,
        name: res.name,
        size: res.size,
        type: res.type,
      };
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log(err);
    } else {
      throw err;
    }
  }
};

export const copyToClipboard = (val) => {
  Clipboard.setString(val);
};

export const fetchCopiedText = async () => {
  const text = await Clipboard.getString();
  return text; 
};
