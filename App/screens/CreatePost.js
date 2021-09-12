import {NativeBaseProvider, Text} from 'native-base';
import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Header from '../components/CreatePostScreen/Header';
import UserHeader from '../components/CreatePostScreen/UserHeader';
import colors from '../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CreatePost({onClose}) {
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
            <Text fontWeight="bold">Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Ionicons name="ios-location-outline" size={30} />
            <Text fontWeight="bold">Location</Text>
          </TouchableOpacity>
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
