import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../constants/colors';
import {Avatar, Text, Menu, Button} from 'native-base';

export default function Post() {
  const [shouldOverlapWithTrigger] = useState(false);
  const [position, setPosition] = useState('auto');
  const [images, setImages] = useState([
    {
      key: 1,
      url: 'https://images.unsplash.com/photo-1516563917828-686dce59b663?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGdpcmwlMjBzbWlsZXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      key: 2,
      url: 'https://images.unsplash.com/photo-1604971666408-9dcd56ece0bf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGdpcmwlMjBzbWlsZXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      key: 3,
      url: 'https://images.unsplash.com/photo-1488760444739-124f3aaeb816?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDd8fGdpcmwlMjBzbWlsZXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      key: 4,
      url: 'https://images.unsplash.com/photo-1568046866815-b19260707681?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTN8fGdpcmwlMjBzbWlsZXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
  ]);
  return (
    <View style={{padding: 15}}>
      <View style={styles.card}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <Avatar source={{uri: images[1].url}} marginRight={2}></Avatar>
            <View>
              <Text fontSize="lg" fontWeight="bold">
                Jenny wilson
              </Text>
              <Text fontSize="xs" color={colors.lightGray} marginLeft={2}>
                Florida, America
              </Text>
            </View>
          </View>

          <Menu
            shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
            placement={position == 'auto' ? undefined : position}
            trigger={triggerProps => {
              return (
                <Button alignSelf="center" variant="unstyled" {...triggerProps}>
                  <Entypo
                    name="dots-three-horizontal"
                    size={20}
                    {...triggerProps}
                  />
                </Button>
              );
            }}>
            <Menu.Item>Edit </Menu.Item>
          </Menu>
        </View>
        <Text
          fontSize="sm"
          color={colors.lightGray}
          noOfLines={3}
          paddingBottom={5}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          sit nostrum vitae voluptatem eos aut iusto, aperiam natus, iure totam
          ad veniam dolor doloremque nulla incidunt excepturi ipsum ex modi.
        </Text>
        <Swiper showsButtons={false} style={styles.swiper}>
          {images.map(images => (
            <FastImage
              key={images.key}
              style={{
                width: '100%',
                height: '90%',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}
              source={{
                uri: images.url,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ))}
        </Swiper>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,

            marginTop: -20,
            //   position:"absolute",
            //   bottom:10
          }}>
          <AntDesign name="heart" color="red" size={20} />
          <Text
            style={{
              paddingLeft: 5,
              paddingRight: 10,
              color: colors.lightGray,
              fontSize: 15,
            }}>
            10k
          </Text>
          <AntDesign name="message1" color={colors.lightGray} size={20} />
          <Text
            style={{
              paddingLeft: 5,
              paddingRight: 10,
              color: colors.lightGray,
              fontSize: 15,
            }}>
            4k
          </Text>
          <Entypo name="share-alternative" color={colors.lightGray} size={20} />
          <Text
            style={{
              paddingLeft: 5,
              paddingRight: 10,
              color: colors.lightGray,
              fontSize: 15,
            }}>
            7k
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  swiper: {
    height: 400,
    borderColor: 'red',
    margin: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,

    // borderWidth: 1,
    width: '100%',
    marginTop: 0,
    paddingBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
  },
});
