import {NativeBaseProvider, Text} from 'native-base';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import Header from '../components/CreatePostScreen/Header';
import UserHeader from '../components/CreatePostScreen/UserHeader';
import colors from '../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Location from '../components/CreatePostScreen/Location';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';

export default function CreatePost({onClose, navigation}) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState();
  const [images, setImages] = useState();

  const savePost = async () => {
    const array = [];
    if (images !== null) {
      // const file_name = 'navod.jpg';
      images.map(async i => {
        const file_name = new Date().getTime() + '.jpg';
        const reference = storage().ref(`photoes/${file_name}`);
        await reference.putFile(i.uri);
        // array.push(i.uri);
      });
    }
  };
  const cleanupImages = () => {
    ImagePicker.clean()
      .then(() => {
        console.log('removed tmp images from tmp directory');
      })
      .catch(e => {
        alert(e);
      });
  };

  const pickMultiple = () => {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
    })
      .then(images => {
        setImage(null);
        setImages(
          images.map(i => {
            console.log('image recived', 1);
            return {
              uri: i.path,
              width: i.width,
              height: i.height,
              mime: i.mime,
            };
          }),
        );
      })
      .catch(e => alert(e));
  };

  const renderVideo = video => {
    console.log('rendering video');
    return (
      <View style={{height: 100, width: 100}}>
        <Video
          source={{uri: video.uri, type: video.mime}}
          style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
          rate={1}
          paused={false}
          volume={0}
          muted={false}
          resizeMode={'cover'}
          onError={e => console.log(e)}
          onLoad={load => console.log(load)}
          repeat={true}
        />
      </View>
    );
  };

  const renderImage = image => {
    return (
      <Image
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          resizeMode: 'cover',
          marginLeft: 5,
        }}
        source={image}
      />
    );
  };

  const renderAsset = image => {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return renderVideo(image);
    }

    return renderImage(image);
  };

  return (
    <View style={styles.container}>
      <NativeBaseProvider>
        <Header onClose={() => onClose()} name="Create Post" />
        <UserHeader />
        <View style={{height: 200, paddingHorizontal: 10}}>
          <TextInput
            style={styles.textInput}
            placeholder="What's on your mind, Albert"
            placeholderTextColor={colors.lightGray}
            multiline={true}
            scrollEnabled={true}
          />
        </View>
        <View style={{borderWidth: 1, height: 115, padding: 5}}>
          <ScrollView horizontal>
            {image ? renderAsset(image) : null}
            {images
              ? images.map(i => <View key={i.uri}>{renderAsset(i)}</View>)
              : null}
          </ScrollView>
        </View>
        <View
          style={{
            // borderWidth: 1,
            width: '100%',
            height: 50,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 15,
            marginTop: 10,
          }}>
          <TouchableOpacity style={styles.btn}>
            <Feather name="image" size={30} />
            <Text fontWeight="bold" onPress={() => pickMultiple()}>
              Gallery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => savePost()}>
            <Ionicons name="ios-location-outline" size={30} />
            <Text fontWeight="bold">Location</Text>
          </TouchableOpacity>

          <Modal
            visible={open}
            style={{
              backgroundColor: 'red',
              height: 100,
              width: 200,
              borderWidth: 1,
            }}>
            <Location />
          </Modal>
        </View>
      </NativeBaseProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textInput: {
    width: '100%',
    color: 'black',
  },
  btn: {
    backgroundColor: 'white',
    width: '47%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
