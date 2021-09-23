import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Alert,
} from 'react-native';
import {
  Avatar,
  NativeBaseProvider,
  Button,
  Text,
  Actionsheet,
  useDisclose,
  Icon,
  Divider,
} from 'native-base';
// import {TextInput} from 'react-native-paper';
import colors from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {ConventionContex} from '../util/ConvetionContext';
import ImagePicker from 'react-native-image-crop-picker';

export default function EditProfile({onClosed}) {
  // const [userName, setUserName] = useState('Albert Forces');
  // const [bio, setBio] = useState(
  //   'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut praesentium facere totam porro nulla, error quo temporibus omnis architecto neque aperiam libero iste in quasi vitae nisi? Quod, officiis veritatis!',
  // );
  const [isFocusUserName, setIsFoucsUserName] = useState(false);
  const [isFocusBio, setIsFoucsBio] = useState(false);

  const userNameClr = isFocusUserName ? colors.primary : colors.lightGray;
  const bioClr = isFocusBio ? colors.primary : colors.lightGray;
  const {isOpen, onOpen, onClose} = useDisclose();
  const [profileImg, setProfileImg] = useState();
  const [imageModalVisible, setImageModalVisible] = useState(false);

  useEffect(() => {
    setProfileImg({
      image: {
        uri: img.profileImg,
        width: '100%',
        height: '100%',
        mime: 'image/jpeg',
      },
    });
  }, []);

  const {userName, img, bio, userId, setImg, setUserName, setBio} =
    useContext(ConventionContex);

  const pickSingle = (cropit, circular = false, mediaType) => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then(image => {
        console.log('received image', image);
        setImageModalVisible(true);
        setProfileImg({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
        });
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  };

  const saveDatabase = image => {
    firestore()
      .collection('Users')
      .doc(userId)
      .update({
        profileImg: image,
      })
      .then(() => {
        console.log('User updated!');
      });
  };

  const deleteImage = () => {
    firestore()
      .collection('Users')
      .doc(userId)
      .update({
        coverImg:
          'https://firebasestorage.googleapis.com/v0/b/chatapp-36777.appspot.com/o/appDetails%2Fpreview.png?alt=media&token=5257d0a8-6fca-4459-8930-c310c6f5939a',
      })
      .then(() => {
        console.log('User updated!');

        setProfileImg({
          image: {
            uri: 'https://firebasestorage.googleapis.com/v0/b/chatapp-36777.appspot.com/o/appDetails%2Fpreview.png?alt=media&token=5257d0a8-6fca-4459-8930-c310c6f5939a',
            width: '100%',
            height: '100%',
            mime: 'image/jpeg',
          },
        });
      });
  };

  const saveImage = async () => {
    if (profileImg !== null) {
      const file_name = new Date().getTime() + '.jpg';
      const reference = storage().ref(`${userId}/profilePictures/${file_name}`);
      const saveImg = await reference.putFile(profileImg.image.uri);
      if (saveImg !== null) {
        const url = await storage()
          .ref(`${userId}/profilePictures/${file_name}`)
          .getDownloadURL();
        saveDatabase(url);
      }
    }
  };

  const renderPrivewImage = () => {
    return (
      <View style={{borderWidth: 1, justifyContent: 'center'}}>
        <Image
          style={{
            height: '80%',
            width: '100%',
            resizeMode: 'contain',
          }}
          source={profileImg.image}
        />
      </View>
    );
  };
  const renderImage = image => {
    return (
      <View style={styles.avatar}>
        <Avatar
          source={{
            uri: img.profileImg,
          }}
          size="2xl"></Avatar>
      </View>
    );
  };

  const renderAsset = image => {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return null;
    }
    return renderImage(image);
  };
  return (
    <View style={styles.container}>
      <NativeBaseProvider>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 20,
          }}>
          <TouchableOpacity onPress={() => onClosed()}>
            <AntDesign name="close" size={40} />
          </TouchableOpacity>
          <Text fontSize="xl">Edit Profile</Text>
          <TouchableOpacity>
            <MaterialIcons name="done" size={40} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.avatar}>
          {profileImg ? (
            renderAsset(profileImg.image)
          ) : (
            <Avatar
              size="2xl"
              source={{
                uri: 'https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
              }}>
              RB
            </Avatar>
          )}
          <Button
            size="lg"
            variant="ghost"
            colorScheme="primary"
            onPress={() => onOpen()}>
            Change profile photo
          </Button>
        </View>
        <View style={{marginTop: 20}}>
          <Text fontSize="sm" color={userNameClr}>
            User name
          </Text>
          <TextInput
            style={[styles.textInput, {borderColor: userNameClr}]}
            onFocus={() => {
              setIsFoucsUserName(true);
              setIsFoucsBio(false);
            }}
            value={userName}
            onChangeText={text => setUserName(text)}
          />
          <Text fontSize="sm" color={bioClr} marginTop={10}>
            Bio
          </Text>
          <TextInput
            style={[styles.textInput, {borderColor: bioClr}]}
            onFocus={() => {
              setIsFoucsBio(true);
              setIsFoucsUserName(false);
            }}
            value={bio}
            onChangeText={text => setBio(text)}
            multiline={true}
          />
        </View>
        <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
          <Actionsheet.Content>
            <Text style={{position: 'absolute', left: 10, top: 30}}>
              Change profile photo
            </Text>
            <Divider my={2} marginTop={5} />
            <Actionsheet.Item
              onPress={() => {
                pickSingle();
                onClose();
              }}>
              Edit Profile
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => {
                deleteImage();
                onClose();
              }}>
              <Text style={{color: 'red', fontWeight: 'bold'}}>
                Remove Profile Photo
              </Text>
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>

        <Modal visible={imageModalVisible}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <View style={styles.navigation}>
              <TouchableOpacity
                onPress={() => {
                  setImageModalVisible(false);
                }}>
                <AntDesign name="close" size={20} />
              </TouchableOpacity>
              <Text style={{fontWeight: 'bold'}}>Image Preview</Text>
              <TouchableOpacity
                onPress={() => {
                  saveImage();

                  setImageModalVisible(false);
                }}>
                <MaterialIcons name="done" size={20} />
              </TouchableOpacity>
            </View>
            {profileImg ? renderPrivewImage() : null}
          </View>
        </Modal>
      </NativeBaseProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  avatar: {
    alignItems: 'center',
    marginTop: 30,
  },
  textInput: {
    width: '100%',
    // height: 50,
    borderBottomWidth: 2,
    color: 'black',
    paddingLeft: 2,
  },
  iconBtn: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
    padding: 0,
  },
  navigation: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    width: '100%',
    height: 50,

    position: 'absolute',
    top: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
