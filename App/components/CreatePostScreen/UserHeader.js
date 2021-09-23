import {Avatar, Text, Spinner} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import colors from '../../constants/colors';

export default function UserHeader({img, userName}) {
  return (
    <View
      style={{
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
      }}>
      <Avatar
        style={{borderWidth: 2, borderColor: 'white'}}
        source={{
          uri: img,
        }}
        size="lg"></Avatar>
      <View style={{marginLeft: 10}}>
        <Text fontWeight="bold">{userName}</Text>
        <TouchableOpacity style={styles.btn}>
          <Text>
            <Fontisto
              name="world"
              color={colors.lightGray}
              style={{paddingLeft: 10}}
              size={14}
            />
            <Text fontSize="xs">{'  '}</Text>
            <Text fontSize="xs" color={colors.lightGray}>
              Public
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.veryLightGray,
    alignItems: 'center',
    paddingVertical: 4,
    borderRadius: 5,
    marginTop: 10,
  },
});
