import React from 'react';
import {View, Text} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import colors from '../../constants/colors';

export default function Location() {
  return (
    <View style={{flex: 1, padding: 10}}>
      <GooglePlacesAutocomplete
        placeholder="Search Locations"
      
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: 'AIzaSyBpbh2v6y2ko2ncF9v8dddBfxkxXvAwosg',
          language: 'en',
        }}
        styles={{
          textInput: {
            height: 50,
            color: 'black',
            fontSize: 16,
            backgroundColor: colors.veryLightGray,
          },
        }}
      />
    </View>
  );
}
