import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../util/AuthContext';

export default function GoogleButton() {
  const {siginIn} = useContext(AuthContext);
  GoogleSignin.configure({
    webClientId:
      '837677812480-o3ndvrmoj9s48ibmcc8sgu4run1nj3np.apps.googleusercontent.com',
  });

  const GoogleSignIn = async () => {
    // Get the users ID token
    const {idToken, user} = await GoogleSignin.signIn();

    console.log(user);
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const credential = auth().signInWithCredential(googleCredential);

    if (credential != null) {
      siginIn('navod');
    }
    siginIn;
  };

  return (
    <View>
      <TouchableOpacity style={styles.btn} onPress={() => GoogleSignIn()}>
        <Image
          source={require('../assets/icons/google.png')}
          style={{width: '100%', height: '100%'}}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 75,
    height: 75,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 15,
  },
});
