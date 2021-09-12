import React from 'react';
import {View, Text} from 'react-native';
import colors from '../../constants/colors';

export default function FollowRequests() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.veryLightGray,
      }}>
      <Text>Follow Requests</Text>
    </View>
  );
}
