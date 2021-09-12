import {NativeBaseProvider, Text} from 'native-base';
import React from 'react';
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

export default function HomScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <NativeBaseProvider>
          <Header />
          <Stories />
          <Post />
          <View style={{width: 50, height: 400}}></View>
        </NativeBaseProvider>
      </ScrollView>
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
