import React, {createContext, useState, useEffect, useContext} from 'react';
import {AuthContext} from './AuthContext';
import firestore from '@react-native-firebase/firestore';

export const ConventionContex = createContext();

export const ConventionContexProvider = ({children}) => {
  const {checkValue} = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [img, setImg] = useState({});
  const [bio, setBio] = useState();

  useEffect(() => {
    const abortCont = new AbortController();
    let userDetails = checkValue();

    try {
      firestore()
        .collection('Users', {signal: abortCont.signal})
        .doc(userDetails.uid)
        .onSnapshot(documentSnapshot => {
          if (documentSnapshot.exists) {
            const {bio, profileImg, coverImg} = documentSnapshot.data();
            setBio(bio);
            setImg({profileImg, coverImg});
          }
        });

      if (checkValue) {
        setEmail(userDetails.email);
        setUserId(userDetails.uid);
        setUserName(userDetails.displayName);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('fetch Aborted');
      }
    }

    return () => abortCont.abort();
  }, []);

  const [text, setText] = useState('Hello');
  const contextValue = {
    text,
    setText,
    email,
    setEmail,
    userId,
    setUserId,
    userName,
    setUserName,
    img,
    setImg,
    bio,
    setBio,
  };

  return (
    <ConventionContex.Provider value={contextValue}>
      {children}
    </ConventionContex.Provider>
  );
};
