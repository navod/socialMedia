import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../components/NotificationScreen/Header';

export default function Notification() {
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
    flex: 1,
    backgroundColor: 'white',
  },
});
