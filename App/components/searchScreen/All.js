import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../constants/colors';

export default function All() {
  return (
    <View style={styles.container}>
      <Text>All</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.veryLightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
