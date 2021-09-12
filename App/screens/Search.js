import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../components/searchScreen/SearchBar';

export default function Search() {
  return (
    <View style={styles.container}>
      <NativeBaseProvider>
        <Header />
      </NativeBaseProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: 'white',
  },
});
