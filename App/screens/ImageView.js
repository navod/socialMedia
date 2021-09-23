import {Button, NativeBaseProvider, Tex, Menu} from 'native-base';
import React, {useContext, useEffect} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text as Word,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import {useState} from 'react/cjs/react.development';
import Header from '../components/CreatePostScreen/Header';
import SampleData from '../data/SampleData';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../constants/colors';
import firestore from '@react-native-firebase/firestore';
import {ConventionContex} from '../util/ConvetionContext';

export default function ImageView({onClose}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [img, setImg] = useState(0);
  const [shouldOverlapWithTrigger] = useState(false);
  const [position, setPosition] = useState('auto');
  const [images, setImages] = useState();
  const {userId} = useContext(ConventionContex);

  useEffect(() => {
    const list = [];
    return (
      firestore()
        .collection(userId + '')
        // Filter results

        // Limit results

        .get()
        .then(querySnapshot => {
          /* ... */
          querySnapshot.forEach(doc => {
            const {images} = doc.data();
            list.push({images});
          });
          console.log(list);
          setImages(list);
        })
    );
  }, []);

  return (
    <View style={{backgroundColor: 'white', flex: 1, paddingHorizontal: 2}}>
      <NativeBaseProvider>
        <Header
          name="Photos"
          onClose={() => {
            onClose();
          }}
        />
        <FlatList
          data={images}
          keyExtractor={(item, index) => index}
          numColumns={4}
          // contentContainerStyle={{backgroundColor: 'white', flex: 1}}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                setImg(index);
                setModalVisible(true);
              }}
              style={{
                width: '25%',
                height: screen.width / 4,
                // flex: 0.5,
                backgroundColor: 'white',
                padding: 2,
                borderRadius: 4,
              }}>
              <FastImage
                style={{
                  width: '100%',
                  height: '100%',
                  // flex: 0.5,
                  backgroundColor: 'white',
                  //   margin: 2,
                  borderRadius: 4,
                }}
                source={{
                  uri: item.images,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
          )}
        />
        {/* <View style={{width: 20, height: 300}}></View> */}
      </NativeBaseProvider>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <NativeBaseProvider>
          {/* <Word style={styles.btn}>Hello</Word> */}

          <Swiper
            index={img}
            dot={<View style={styles.dot} />}
            activeDot={<View style={styles.dot} />}
            height={screen.height / 1.6}
            containerStyle={{marginTop: 10}}>
            {SampleData.map((images, index) => (
              <FastImage
                key={index}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                source={{
                  uri: images,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            ))}
          </Swiper>
          <Menu
            shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
            placement={position == 'auto' ? undefined : position}
            trigger={triggerProps => {
              return (
                <Button
                  style={styles.btn}
                  // alignSelf="center"
                  variant="unstyled"
                  {...triggerProps}>
                  <Entypo
                    name="dots-three-vertical"
                    size={15}
                    color="black"
                    {...triggerProps}
                    style={{zIndex: 2, marginLeft: -3}}
                  />
                </Button>
              );
            }}>
            <Menu.Item style={{flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign
                name="delete"
                size={18}
                color="red"
                style={{paddingRight: 10}}
              />
              <Word style={{paddingRight: 15, color: colors.lightGray}}>
                Delete
              </Word>
            </Menu.Item>
            <Menu.Item style={{flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign
                name="edit"
                size={18}
                color={colors.lightGray}
                style={{paddingRight: 10}}
              />
              <Word style={{paddingRight: 15, color: colors.lightGray}}>
                Edit
              </Word>
            </Menu.Item>
          </Menu>
        </NativeBaseProvider>
        {/* <Word>
            {SampleData.length}/ {img}
          </Word> */}
      </Modal>
    </View>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 0,
    height: 0,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  btn: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
  },
});
