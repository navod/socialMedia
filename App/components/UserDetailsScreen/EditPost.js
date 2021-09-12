import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {Avatar, NativeBaseProvider, Button, Text} from 'native-base';
// import {TextInput} from 'react-native-paper';
import colors from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function EditProfile({onClose}) {
  const [userName, setUserName] = useState('Albert Forces');
  const [bio, setBio] = useState(
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut praesentium facere totam porro nulla, error quo temporibus omnis architecto neque aperiam libero iste in quasi vitae nisi? Quod, officiis veritatis!',
  );
  const [isFocusUserName, setIsFoucsUserName] = useState(false);
  const [isFocusBio, setIsFoucsBio] = useState(false);

  const userNameClr = isFocusUserName ? colors.primary : colors.lightGray;
  const bioClr = isFocusBio ? colors.primary : colors.lightGray;

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
          <TouchableOpacity onPress={() => onClose()}>
            <AntDesign name="close" size={40} />
          </TouchableOpacity>
          <Text fontSize="xl">Edit Profile</Text>
          <TouchableOpacity>
            <MaterialIcons name="done" size={40} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.avatar}>
          <Avatar
            size="2xl"
            source={{
              uri: 'https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
            }}>
            RB
          </Avatar>
          <Button
            size="lg"
            variant="ghost"
            colorScheme="primary"
            onPress={() => console.log('hello world')}>
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
});
