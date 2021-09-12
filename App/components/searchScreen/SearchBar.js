import React from 'react';
import {
  VStack,
  Input,
  Button,
  IconButton,
  Icon,
  Text,
  NativeBaseProvider,
  Center,
  Box,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';
import {borderWidth} from 'styled-system';

export default function Header() {
  return (
    <View style={{padding: 10, paddingTop: 30}}>
      <VStack space={8} width="100%">
        <VStack width="100%" space={2} height={60}>
          <Input
            placeholder="Search"
            variant="filled"
            width="100%"
            bg="gray.200"
            borderRadius={10}
            height={60}
            py={1}
            px={2}
            _web={{
              _focus: {style: {boxShadow: 'sm'}},
            }}
            _android={{_focus: {borderWidth: 0}}}
            _ios={{_focus: {borderWidth: 0}}}
            InputLeftElement={
              <Icon
                size="sm"
                ml={2}
                size={5}
                color="gray.400"
                as={<Ionicons name="ios-search" />}
              />
            }
          />
        </VStack>
      </VStack>
    </View>
  );
}
