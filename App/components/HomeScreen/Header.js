import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {NativeBaseProvider, Text, Divider} from 'native-base';
import {marginTop} from 'styled-system';

export default function Header() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // padding:10
        paddingHorizontal: 10,
        marginTop: 10,
      }}>
      <Text fontSize="xl" fontWeight="bold">
        Social Media
      </Text>
      <View style={styles.dot}></View>
      <TouchableOpacity>
        <Image
          source={require('../../assets/icons/direct-message.png')}
          style={{width: 40, height: 40}}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  dot: {
    width: 7,
    height: 7,
    backgroundColor: 'red',
    borderRadius: 7,
    position: 'absolute',
    right: 20,
    top: 0,
  },
});
