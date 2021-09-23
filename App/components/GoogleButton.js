import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../util/AuthContext';
import firestore from '@react-native-firebase/firestore';

export default function GoogleButton() {
  const {siginIn, checkValue} = useContext(AuthContext);
  GoogleSignin.configure({
    webClientId:
      '837677812480-o3ndvrmoj9s48ibmcc8sgu4run1nj3np.apps.googleusercontent.com',
  });

  const GoogleSignIn = async () => {
    // Get the users ID token
    const {idToken, user} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const credential = auth()
      .signInWithCredential(googleCredential)
      .then(creteUser => {
        const uid = creteUser.user.uid;

        const subscriber = firestore().collection('Users').doc(uid);
        subscriber.get().then(doc => {
          if (doc.exists) {
            console.log('Document data:', doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');

            firestore()
              .collection('Users')
              .doc(uid)
              .set({
                bio: '',
                profileImg:
                  'https://firebasestorage.googleapis.com/v0/b/chatapp-36777.appspot.com/o/appDetails%2Fno-photo-available.png?alt=media&token=b2201b8c-6afc-4e59-a6dd-9d38c0b5c07c',
                coverImg:
                  'https://firebasestorage.googleapis.com/v0/b/chatapp-36777.appspot.com/o/appDetails%2Fpreview.png?alt=media&token=5257d0a8-6fca-4459-8930-c310c6f5939a',
              })
              .then(() => {
                console.log('User added!');
                checkValue();
              });
          }
        });
      });

    if (credential != null) {
      siginIn('navod');
    }
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
