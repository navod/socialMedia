import React, {useCallback, useContext, useEffect, useState} from 'react';
import {View, Text, Keyboard, FlatList, StyleSheet} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {ConventionContex} from '../util/ConvetionContext';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../util/AuthContext';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entyo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {flexDirection} from 'styled-system';
import colors from '../constants/colors';

export default function Chat({userName, sendId}) {
  const {userId, email} = useContext(ConventionContex);
  const [messages, setMessages] = useState([]);
  const {checkValue} = useContext(AuthContext);
  const chatsRef = firestore().collection('chats');
  const [list, setList] = useState([]);

  useEffect(() => {
    const unsubscribe = chatsRef.onSnapshot(querySnapshot => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({type}) => type === 'added')
        .map(({doc}) => {
          const message = doc.data();

          return {
            ...message,
            createdAt: message.createdAt.toDate(),
          };
        })
        .sort((a, b) => {
          b.createdAt.getTime() - a.createdAt.getTime();
        });

      appendMessages(messagesFirestore);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  async function handleSend(messages) {
    const writes = messages.map(m => {
      chatsRef.add(m);
    });

    await Promise.all(writes);
  }

  const appendMessages = useCallback(
    messages => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages).sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
        ),
      );
    },
    [messages],
  );

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 20,
            paddingLeft: 20,
          }}>
          <SimpleLineIcons name="arrow-left" size={15} />
          <Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 15}}>
            {userName}
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Entyo
            name="video-camera"
            style={{color: colors.primary, paddingRight: 10}}
            size={30}
          />
          <Ionicons
            name="call-sharp"
            style={{color: colors.primary, paddingRight: 20}}
            size={30}
          />
        </View>
      </View>
      <GiftedChat
        messages={messages}
        user={{
          _id: checkValue().uid,
          name: checkValue().displayName,
          avatar: null,
        }}
        onSend={handleSend}
        keyboardShouldPersistTaps="never"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: 60,
    elevation: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
