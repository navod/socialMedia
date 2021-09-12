import {Text} from 'native-base';
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Header({}) {
  return (
    <View style={styles.header}>
      <Ionicons  name="notifications" size={30} />

      <Text fontSize="xl" fontWeight="bold" paddingLeft={4}>
        Notification
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 70,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 10,
    // justifyContent: 'space-around',
    alignItems: 'center',
  },
});
