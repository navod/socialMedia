import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageView from '../../screens/ImageView';

export default function Images(navigation) {
  const [imgSize, setImgSize] = useState(4);

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <Text style={styles.text}>Photos</Text>
        <View style={styles.subContainer}>
          {imgSize === 4 && <Size4></Size4>}
          {imgSize === 3 && <Size3></Size3>}
          {imgSize === 2 && <Size2></Size2>}
          {imgSize === 1 && <Size1></Size1>}
        </View>
      </View>
    </View>
  );
}
//
const Size4 = () => {
  const [modalVisible, setModalVisible] = useState(false);
  // console.log(navigation);
  return (
    <View style={{flexDirection: 'row', height: '100%'}}>
      <FastImage
        style={styles.size1LargeImg}
        source={{
          uri: 'https://images.unsplash.com/photo-1476817343404-01ccd61218d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
          //   headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={{width: '100%'}}>
        <View style={styles.imgGroup}>
          <FastImage
            style={styles.smallImg}
            source={{
              uri: 'https://images.unsplash.com/photo-1480914362564-9f2c2634e266?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <FastImage
            style={styles.smallImg}
            source={{
              uri: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

        <Modal visible={modalVisible}>
          <ImageView onClose={() => setModalVisible(false)} />
        </Modal>
        <View style={styles.imgGroup}>
          <FastImage
            style={styles.smallImg}
            source={{
              uri: 'https://images.unsplash.com/photo-1489278353717-f64c6ee8a4d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.smallImg}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                borderRadius: 10,
              }}
              onPress={() => {
                setModalVisible(true);
              }}>
              <FastImage
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 10,
                  opacity: 0.3,
                }}
                source={{
                  uri: 'https://images.unsplash.com/photo-1477420226391-9ff4fb9085fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Text
                style={{
                  position: 'absolute',
                  left: 20,
                  bottom: 35,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                +20
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const Size2 = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'space-between',
      }}>
      <FastImage
        style={[styles.size1LargeImg, {width: '48%'}]}
        source={{
          uri: 'https://images.unsplash.com/photo-1489278353717-f64c6ee8a4d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={{width: 10, height: '100%'}}></View>
      <FastImage
        style={[styles.size1LargeImg, {width: '48%'}]}
        source={{
          uri: 'https://images.unsplash.com/photo-1477420226391-9ff4fb9085fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );
};

const Size3 = () => {
  return (
    <View style={{flexDirection: 'row', height: '100%'}}>
      <FastImage
        style={styles.size1LargeImg}
        source={{
          uri: 'https://images.unsplash.com/photo-1477420226391-9ff4fb9085fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={{height: '100%', width: 10}}></View>
      <View style={{width: '95%'}}>
        <FastImage
          style={[styles.imgGroup, {height: '47%', borderRadius: 15}]}
          source={{
            uri: 'https://images.unsplash.com/photo-1489278353717-f64c6ee8a4d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />

        <View style={{width: '100%', height: 10}}></View>
        <FastImage
          style={[styles.imgGroup, {height: '47%', borderRadius: 15}]}
          source={{
            uri: 'https://images.unsplash.com/photo-1480914362564-9f2c2634e266?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    </View>
  );
};

const Size1 = () => {
  return (
    <FastImage
      style={[styles.size1LargeImg, {width: '100%', borderRadius: 20}]}
      source={{
        uri: 'https://images.unsplash.com/photo-1476817343404-01ccd61218d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        //   headers: {Authorization: 'someAuthToken'},
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};
const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    height: screen.width / 1.3,
    paddingBottom: 50,
  },
  secondContainer: {
    padding: 15,
    height: '120%',
    paddingBottom: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 10,
    // paddingVertical: 10,
  },
  subContainer: {
    width: '100%',
    height: '94%',
  },
  size1LargeImg: {
    width: '50%',
    height: '100%',
    borderRadius: 20,
  },
  imgGroup: {
    flexDirection: 'row',
    height: '50%',

    width: '50%',
    padding: 10,
    justifyContent: 'space-between',
  },
  smallImg: {
    width: '47%',
    borderRadius: 10,
  },
});
