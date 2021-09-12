import React from 'react';
import {ScrollView, View} from 'react-native';
import {Avatar, Text,Divider} from 'native-base';
import colors from '../../constants/colors';

export default function Stories() {
  return (
    <View style={{marginTop: 10,paddingHorizontal:10}}>
         <Divider my={2} />
      <Text fontSize={15} fontWeight="bold">
        Featured Stories
      </Text>
      <View style={{marginTop: 10}}>
        <ScrollView>
          <Avatar
            backgroundColor="#F7FCFE"
            borderStyle="dashed"
            borderWidth={2}
            borderColor={colors.primary}
            size="lg">
            <Text fontSize="2xl" color={colors.primary}>
              +
            </Text>
          </Avatar>
        </ScrollView>
        <Text fontSize={12} marginTop={2}>Share story</Text>
      </View>
      <Divider my={2} />
    </View>
  );
}
