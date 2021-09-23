import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import colors from '../constants/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Input,
  Icon,
  Box,
  Center,
  NativeBaseProvider,
  Button,
  useToast,
  VStack,
  Alert,
  FormControl,
} from 'native-base';
import {KeyBoardSpacer} from '../components/KeyBoardSpacer';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../util/AuthContext';
import firestore from '@react-native-firebase/firestore';

export default function SignUp({navigation}) {
  const [show, setShow] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [status, setStatus] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [alerDetails, setAlertDetails] = useState({
    title: '',
    states: '',
  });
  const handleClick = () => setShow(!show);

  const loginHandle = () => {
    siginIn(email);
  };

  const {siginIn, checkValue} = useContext(AuthContext);

  const saveToDB = uid => {
    firestore()
      .collection('Users')
      .doc(uid)
      .set({
        userName: userName,
        bio: '',
        profileImg:
          'https://firebasestorage.googleapis.com/v0/b/chatapp-36777.appspot.com/o/appDetails%2Fno-photo-available.png?alt=media&token=b2201b8c-6afc-4e59-a6dd-9d38c0b5c07c',
        coverImg:
          'https://firebasestorage.googleapis.com/v0/b/chatapp-36777.appspot.com/o/appDetails%2Fpreview.png?alt=media&token=5257d0a8-6fca-4459-8930-c310c6f5939a',
      })
      .then(() => {
        console.log('User added!');
        checkValue();
      });
  };

  const signInWithEmail = () => {
    if (
      email == '' ||
      userName == '' ||
      password == '' ||
      confirmPassword == ''
    ) {
      setStatus(true);
      setAlertDetails({
        title: 'Please fill the all details',
        states: 'warning',
      });
    } else {
      if (password === confirmPassword) {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(createUser => {
            createUser.user.updateProfile({displayName: userName});

            setStatus(true);
            setAlertDetails({title: 'Account created', states: 'success'});
            loginHandle();
            saveToDB(createUser.user.uid);
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log(error);
              setStatus(true);
              setAlertDetails({
                title: 'That email address is already in use!',
                states: 'error',
              });
            } else if (error.code === 'auth/invalid-email') {
              console.log(error);
              setStatus(false);
              setStatus(true);
              setAlertDetails({
                title: 'That email address is invalid!',
                states: 'error',
              });
            } else {
              console.log(error);
              setStatus(true);
              setShow(true);
              setAlertDetails({
                title: 'Password should be at least 6 characters',
                states: 'warning',
              });
            }
          });
      } else {
        setStatus(true);
        setAlertDetails({
          title: 'Password did not match',
          states: 'warning',
        });
      }
    }
  };

  return (
    <NativeBaseProvider>
      <FormControl style={{flex: 1}}>
        <View style={styles.container}>
          {!alerDetails.title == '' && (
            <Alert
              variant="left-accent"
              status={alerDetails.states}
              style={{position: 'absolute', right: 0, top: 20}}>
              <Alert.Icon />
              <Alert.Title flexShrink={1}>{alerDetails.title}</Alert.Title>
            </Alert>
          )}

          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={{width: 50}}>
            <Ionicons name="chevron-back-outline" size={30} color="black" />
          </TouchableOpacity>
          <ScrollView scrollEnabled={scrollEnabled}>
            <Text style={styles.headerText}>Sign Up</Text>
            <Text style={styles.subText}>
              Please enter your information below in order to login to your
              accoount.
            </Text>

            <View style={styles.inputArea}>
              <Text style={{color: colors.lightGray, marginVertical: 15}}>
                Full Name
              </Text>
              <Input
                InputLeftElement={
                  <Icon
                    as={<FontAwesome name="user-o" />}
                    size="sm"
                    m={2}
                    _light={{
                      color: colors.lightGray,
                    }}
                    _dark={{
                      color: colors.lightGray,
                    }}
                  />
                }
                value={userName}
                placeholder="Full name"
                onChangeText={text => setUserName(text)}
              />
              {status && (
                <FormControl.ErrorMessage>
                  Please enter your user name.
                </FormControl.ErrorMessage>
              )}

              <Text style={{color: colors.lightGray, marginVertical: 15}}>
                Email Address
              </Text>
              <Input
                InputLeftElement={
                  <Icon
                    as={<Fontisto name="email" />}
                    size="sm"
                    m={2}
                    _light={{
                      color: colors.lightGray,
                    }}
                    _dark={{
                      color: colors.lightGray,
                    }}
                  />
                }
                placeholder="jhon@gmail.com"
                value={email}
                onChangeText={text => setEmail(text)}
              />

              <Text
                style={{
                  color: colors.lightGray,
                  marginVertical: 15,
                }}>
                Password
              </Text>

              <Input
                InputLeftElement={
                  <Icon
                    as={<AntDesign name="lock" />}
                    size="sm"
                    m={2}
                    _light={{
                      color: colors.lightGray,
                    }}
                    _dark={{
                      color: colors.lightGray,
                    }}
                  />
                }
                type={show ? 'text' : 'password'}
                value={password}
                onChangeText={text => setPassword(text)}
                InputRightElement={
                  <Button
                    style={{width: 50, backgroundColor: 'white'}}
                    roundedLeft={0}
                    roundedRight="md"
                    onPress={handleClick}>
                    <Icon
                      as={<Feather name="eye-off" />}
                      size="5"
                      m={2}
                      _light={{
                        color: colors.lightGray,
                      }}
                      _dark={{
                        color: colors.lightGray,
                      }}
                    />
                  </Button>
                }
                placeholder="***************" // mx={4}
                _light={{
                  placeholderTextColor: 'blueGray.400',
                }}
                _dark={{
                  placeholderTextColor: 'blueGray.50',
                }}
              />
              {status && (
                <FormControl.ErrorMessage>
                  Please enter your user password.
                </FormControl.ErrorMessage>
              )}
              <Text
                style={{
                  color: colors.lightGray,
                  marginVertical: 15,
                }}>
                Confirm Password
              </Text>

              <Input
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
                InputLeftElement={
                  <Icon
                    as={<AntDesign name="lock" />}
                    size="sm"
                    m={2}
                    _light={{
                      color: colors.lightGray,
                    }}
                    _dark={{
                      color: colors.lightGray,
                    }}
                  />
                }
                type={show ? 'text' : 'password'}
                InputRightElement={
                  <Button
                    style={{width: 50, backgroundColor: 'white'}}
                    roundedLeft={0}
                    roundedRight="md"
                    onPress={handleClick}>
                    <Icon
                      as={<Feather name="eye-off" />}
                      size="5"
                      m={2}
                      _light={{
                        color: colors.lightGray,
                      }}
                      _dark={{
                        color: colors.lightGray,
                      }}
                    />
                  </Button>
                }
                placeholder="***************" // mx={4}
                _light={{
                  placeholderTextColor: 'blueGray.400',
                }}
                _dark={{
                  placeholderTextColor: 'blueGray.50',
                }}
              />
            </View>
            <Button
              colorScheme="blue"
              size="lg"
              onPress={() => signInWithEmail()}>
              Sign Up
            </Button>

            <View style={styles.bottmArea}>
              <Text
                style={{
                  color: colors.lightGray,
                  textAlign: 'center',
                  fontSize: 15,
                }}>
                Don't have an account?
                <Text style={{color: colors.primary, fontWeight: 'bold'}}>
                  {' '}
                  Sign In
                </Text>
              </Text>
              <KeyBoardSpacer
                onToggle={keyboardIsVisible =>
                  setScrollEnabled(keyboardIsVisible)
                }
              />
            </View>
          </ScrollView>
        </View>
      </FormControl>
    </NativeBaseProvider>
  );
}

const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
  headerText: {
    color: 'black',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 30,
    marginTop: screen.height / 15,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  subText: {
    marginTop: 20,
    color: colors.lightGray,
    textAlign: 'center',
  },
  inputArea: {
    marginTop: 30,
    marginBottom: 30,
  },
  bottmArea: {
    marginTop: 10,
  },
});
