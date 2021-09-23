import React, {useEffect, useState} from 'react';
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
  Avatar,
  Divider,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Header from '../components/searchScreen/SearchBar';
import Chat from './Chat';

export default function Search() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [sendId, setSendId] = useState('');
  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .onSnapshot(documentSnapshot => {
        const list = [];

        documentSnapshot.forEach(doc => {
          if (doc.exists) {
            const {profileImg, userName} = doc.data();

            list.push({
              id: doc.id,

              profileImg,
              userName,
            });
          }
        });
        setUsers(list);

        if (loading) {
          setLoading(false);
        }
      });
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="black" />;
  } else {
    return (
      <View>
        <View style={styles.searchResult}>
          <FlatList
            ListHeaderComponent={
              <NativeBaseProvider>
                <Header />
              </NativeBaseProvider>
            }
            data={users}
            // renderItem={renderItem}

            renderItem={({item}) => {
              return (
                <TouchableOpacity>
                  <TouchableOpacity
                    style={styles.row}
                    onPress={() => {
                      setSendId(item.id);

                      setUserName(item.userName);
                      setModalVisible(true);
                    }}>
                    <Avatar size="lg" source={{uri: item.profileImg}}></Avatar>
                    <Text style={styles.text}>{item.userName}</Text>
                  </TouchableOpacity>
                  <Divider />
                </TouchableOpacity>
              );
            }}
            style={{height: screen.height}}
            keyExtractor={item => item.id}
          />
        </View>

        <Modal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <Chat userName={userName} sendId={sendId} />
        </Modal>
      </View>
    );
  }
}
const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
  searchResult: {
    // flex: 14,
    // marginTop: 10,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

// return (
//   <View style={styles.container}>
//     <NativeBaseProvider>

//       <Text>Hellor</Text>
//     </NativeBaseProvider>
//   </View>
// );
// }

// const styles = StyleSheet.create({
//   container: {
//     height: 100,
//     backgroundColor: 'white',
//   },
// });
