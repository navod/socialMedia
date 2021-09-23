import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, FlatList, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {NativeBaseProvider} from 'native-base';

export default function Test2() {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users

  // useEffect(() => {
  //   const subscriber = firestore()
  //     .collection('SampleData')
  //     .onSnapshot(querySnapshot => {
  //       const users = [];

  //       querySnapshot.forEach(documentSnapshot => {
  //         users.push({
  //           ...documentSnapshot.data(),
  //           key: documentSnapshot.id,
  //         });
  //       });

  //       setUsers(users);
  //       setLoading(false);
  //     });

  //   // Unsubscribe from events when no longer in use
  //   return () => subscriber();
  // }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('1yofeGpxGJO1kMPRFhUYsHuEZfF2')
      .onSnapshot(documentSnapshot => {
        const list = [];

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
            });

            // firestore()
            //   .collection('Users')
            //   .doc(userId)
            //   .onSnapshot(documentSnapshot => {
            //     const {profileImg, userName} = documentSnapshot.data();

            //   });
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
    return <ActivityIndicator />;
  }

  return (
    <NativeBaseProvider>
      <FlatList
        data={users}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>User ID: {item.key}</Text>
            <Text>User Name: {item.name}</Text>
            <Image
              source={{uri: item.images[1]}}
              style={{width: 200, height: 200}}
            />
          </View>
        )}
      />
    </NativeBaseProvider>
  );
}
