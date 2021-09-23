import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../constants/colors';
import {Avatar, Text, Menu, Button, NativeBaseProvider} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import {ConventionContex} from '../../util/ConvetionContext';
import Header from './Header';
import Stories from './Stories';
import {AuthContext} from '../../util/AuthContext';

export default function Post() {
  // const {userId} = useContext(ConventionContex);

  const [shouldOverlapWithTrigger] = useState(false);
  const [position, setPosition] = useState('auto');
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [list, setList] = useState([]);
  const {checkValue} = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const [like, setLike] = useState(false);

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
  const list = [];
  useEffect(() => {
    setTodos([]);
    let userDetails = checkValue();

    const subscriber = firestore()
      .collection('Users')
      .onSnapshot(documentSnapshot => {
        const users = [];

        documentSnapshot.forEach(doc => {
          if (doc.exists) {
            users.push({
              id: doc.id,
            });
          }
        });
        // setUsers(users);

        const promises = users.map(users => {
          firestore()
            .collection(users.id)
            .onSnapshot(documentSnapshot => {
              documentSnapshot.forEach(doc => {
                if (doc.exists) {
                  const {
                    comments,
                    description,
                    images,
                    isLike,
                    likeCount,
                    profileImg,
                    userName,
                  } = doc.data();

                  list.push({
                    id: doc.id,
                    description,
                    images,
                    isLike,
                    likeCount,
                    comments,
                    profileImg,
                    userName,
                    userId: users.id,
                  });
                }
              });
              setTodos(list);
            });
        });
        Promise.all(promises).then(() => setLoading(false));
      });

    return () => {
      subscriber();
    };
  }, []);

  const updateLikeCount = (userId, docId, likeCount) => {
    const like = parseInt(likeCount) + 1;
    firestore()
      .collection(userId)
      .doc(docId)
      .update({
        likeCount: like,
      })
      .then(() => {
        return true;
      })
      .catch(err => {
        return false;
      });
    setTodos([]);
  };
  const renderItem = ({item}) => {
    return (
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
            <Avatar source={{uri: item.profileImg}} marginRight={2}></Avatar>
            <View>
              <Text fontSize="lg" fontWeight="bold">
                {item.userName}
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
          {item.description}
        </Text>
        <Swiper showsButtons={false} style={styles.swiper}>
          {item.images.map(images => (
            <FastImage
              key={Math.floor(Math.random() * 11)}
              style={{
                width: '100%',
                height: '90%',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}
              source={{
                uri: images,
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
          {like ? (
            <TouchableOpacity onPress={() => setLike(false)}>
              <AntDesign name="heart" color="red" size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setLike(true);
                let result = updateLikeCount(
                  item.userId,
                  item.id,
                  item.likeCount,
                );
              }}>
              <AntDesign name="hearto" color={colors.lightGray} size={20} />
            </TouchableOpacity>
          )}

          <Text
            style={{
              paddingLeft: 5,
              paddingRight: 10,
              color: colors.lightGray,
              fontSize: 15,
            }}>
            {item.likeCount}
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
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="black" />;
  } else {
    return (
      <View>
        <FlatList
          data={todos}
          renderItem={renderItem}
          ListHeaderComponent={<Stories />}
          // renderItem={({item}) => {
          //   console.log(item.description);
          //   return <Text fontSize="lg">Hello</Text>;
          // }}
          keyExtractor={item => item.id}
          // refreshing
          ListFooterComponent={() => (
            <View style={{height: 200, width: 200}}></View>
          )}
        />
      </View>
    );
  }
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
    width: '95%',
    marginTop: 0,
    paddingBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    marginLeft: 10,
    marginTop: 10,
  },
});
