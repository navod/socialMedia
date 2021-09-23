import {Text} from 'native-base';
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Header({onClose, name, states, onSave}) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={{marginLeft: -40}}
        onPress={() => onClose(false)}>
        <MaterialIcons name="keyboard-arrow-left" size={40} />
      </TouchableOpacity>
      <Text fontSize="xl" fontWeight="bold">
        {name}
      </Text>

      <TouchableOpacity style={{marginRight: -30}} onPress={() => onSave()}>
        <Text fontWeight="bold" fontSize={'xs'}>
          Done
        </Text>
      </TouchableOpacity>
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
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
