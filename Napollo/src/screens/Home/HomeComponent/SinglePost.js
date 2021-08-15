import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import CommentFooter from './HomeInfo/Comment/CommentDetailsFooter/Footer';
import OpenToastBtn from '../../../Components/Button/OpenToastBtn';

const SinglePost = (props) => {
  return (
    <View style={styles.container}>
      {/* TOP PART */}
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: '#000',
          opacity: 0.3,
          zIndex: 50,
          borderRadius: 10,
        }}
      />
      <View
        style={{
          width: '100%',
          height: '70%',
          padding: 15,
          backgroundColor: 'rgba(0,0,0,0.55)',
          flex: 1,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          zIndex: 200,
          // shadowColor: 'rgba(0,0,0,0.7)',
          // shadowOffset: {
          //   width: 0,
          //   height: 5,
          // },
          // shadowOpacity: 0.34,
          // shadowRadius: 6.27,

          // elevation: 10,
        }}>
        <View style={styles.mainTop}>
          <TouchableOpacity activeOpacity={0.8} style={styles.artist}>
            <Image
              source={require('../../../assests/images/caro3.jpg')}
              style={styles.artistImage}
            />
            <View style={{marginTop: 5}}>
              <Text style={styles.nameText}>Drake</Text>
              <Text style={styles.username}>@OVO</Text>
            </View>
          </TouchableOpacity>

          <OpenToastBtn onPress={() => props.onPress.current.snapTo(0)} />
        </View>
        {/* COMMENTS */}

        <Text numberOfLines={2} style={styles.comment}>
          Get ready to experience music at it's very best.
        </Text>
        <View style={styles.postImage}>
          <Image
            source={require('../../../assests/images/death-bed.jpg')}
            style={{width: '100%', height: '100%', borderRadius: 5}}
            resizeMode="cover"
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '30%',
          padding: 15,
          borderRadius: 10,
          zIndex: 200,
          // backgroundColor: '#900',
        }}>
        <CommentFooter />
      </View>
    </View>
  );
};

export default SinglePost;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // borderWidth: 1,
    // borderColor: '#222',

    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginBottom: 20,
  },
  mainTop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  artist: {
    width: '80%',
    flexDirection: 'row',
    // alignItems: 'center',
  },
  artistImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    marginRight: 10,
  },
  nameText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Helvetica-Bold',
  },
  username: {
    color: '#f68128',
    fontSize: 10,
    fontFamily: 'Helvetica-Medium',
  },
  comment: {
    fontSize: 13,
    color: '#fff',
    width: '100%',
    marginTop: 15,
    fontFamily: 'Helvetica-Light',
  },
  postImage: {
    width: '100%',
    height: 180,
    borderRadius: 5,

    marginTop: 15,
  },
});

//  <View style={styles.container}>

//       <View style={styles.imageCont}>
//         <Image
//           source={require('../../../assests/images/caro3.jpg')}
//           style={{width: 60, height: 60, borderRadius: 60 / 2}}
//         />
//       </View>

//       <View style={styles.commentContainer}>
//         <View style={styles.commentDetails}>
//           <Text style={styles.nameText}>Drake</Text>
//           <Text style={styles.username}>@OVO</Text>
//           <Text style={styles.comment}>
//             Get ready to experience music at it's very best
//           </Text>
//         </View>
//         <View style={styles.postImage}>
//           <Image
//             source={require('../../../assests/images/death-bed.jpg')}
//             style={{width: '100%', height: '100%', borderRadius: 5}}
//             resizeMode="cover"
//           />
//         </View>
//         <CommentFooter onPress={props.onPress} />
//       </View>
//     </View>

// container: {
//   width: '100%',
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   flex: 1,

//   borderBottomColor: '#222',
//   borderWidth: 1,
//   marginTop: 15,
// },
// imageCont: {
//   marginRight: 15,
//   width: '15%',
// },

// nameText: {
//   color: '#fff',
//   fontSize: 13,
//   fontFamily: 'Helvetica-Bold',
// },
// username: {
//   color: '#f68128',
//   fontSize: 9,
//   fontFamily: 'Helvetica-Medium',
// },
// comment: {
//   fontSize: 11,
//   color: '#fff',
//   width: '100%',
//   marginTop: 5,
//   fontFamily: 'Helvetica-Light',
// },
// postImage: {
//   width: '100%',
//   height: 150,
//   borderRadius: 5,

//   marginTop: 5,
// },
// commentContainer: {
//   width: '80%',
// },
