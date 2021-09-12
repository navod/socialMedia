import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
export default function FacebookBtn() {
  return (
    <View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => console.log('Pressed')}>
        <Image
          source={require('../assets/icons/facebook.png')}
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
