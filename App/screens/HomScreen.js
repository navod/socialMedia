import {NativeBaseProvider, Text} from 'native-base';
import React, {useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import Header from '../components/HomeScreen/Header';
import Post from '../components/HomeScreen/Post';
import Stories from '../components/HomeScreen/Stories';
import {AuthContext} from '../util/AuthContext';

export default function HomScreen() {
  const {checkValue} = useContext(AuthContext);
  useEffect(() => {
    checkValue();
  }, []);
  return (
    <View style={styles.container}>
      <NativeBaseProvider>
        <Header />

        <Post />
        <View style={{width: 50, height: 400}}></View>
      </NativeBaseProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // padding: 20,
  },
});
