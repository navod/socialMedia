import {Avatar, Text} from 'native-base';
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import colors from '../../constants/colors';

export default function UserHeader() {
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
          uri: 'https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
        }}
        size="lg"></Avatar>
      <View style={{marginLeft: 10}}>
        <Text fontWeight="bold">Albert Fores</Text>
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
