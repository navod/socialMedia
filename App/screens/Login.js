import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import colors from '../constants/colors';
import MaterialIcons from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Input,
  Icon,
  Box,
  Center,
  NativeBaseProvider,
  Button,
  Alert,
} from 'native-base';
import GoogleButton from '../components/GoogleButton';
import FacebookBtn from '../components/FacebookBtn';
import {KeyBoardSpacer} from '../components/KeyBoardSpacer';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../util/AuthContext';

export default function Login({navigation}) {
  const [show, setShow] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const [status, setStatus] = useState(false);
  const [alerDetails, setAlertDetails] = useState({
    title: '',
    states: '',
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleClick = () => setShow(!show);

  const {siginIn, checkValue} = useContext(AuthContext);
  const loginUser = () => {
    if (email == '' || password == '') {
      setStatus(true);
      setAlertDetails({
        title: 'Please fill the all details',
        states: 'warning',
      });
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          siginIn(email);
          checkValue();
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            console.log(error);

            setStatus(true);
            setAlertDetails({
              title: 'Account does not exist',
              states: 'error',
            });
          } else if (error.code === 'auth/invalid-email') {
            console.log(error);

            setStatus(true);
            setAlertDetails({
              title: 'That email address is invalid!',
              states: 'error',
            });
          } else {
            console.log(error);
            setStatus(true);

            setAlertDetails({
              title:
                'The password is invalid or the user does not have a password.',
              states: 'warning',
            });
          }
        });
    }
  };
  return (
    <NativeBaseProvider>
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
        <ScrollView scrollEnabled={scrollEnabled}>
          <Text style={styles.headerText}>Sign In Now</Text>
          <Text style={styles.subText}>
            Please enter your information below in order to login to your
            accoount.
          </Text>

          <View style={styles.inputArea}>
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
              value={email}
              placeholder="jhon@gmail.com"
              onChangeText={text => setEmail(text)}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: colors.lightGray,
                  marginVertical: 15,
                  marginTop: 30,
                }}>
                Password
              </Text>
              <Text
                style={{
                  color: 'black',
                  marginVertical: 15,
                  marginTop: 30,
                }}>
                Forget Password ?
              </Text>
            </View>

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
              value={password}
              onChangeText={text => setPassword(text)}
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
          <Button colorScheme="blue" size="lg" onPress={() => loginUser()}>
            Sign In
          </Button>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 30,
            }}>
            <GoogleButton />
            <FacebookBtn />
          </View>
          <View style={styles.bottmArea}>
            <Text
              style={{
                color: colors.lightGray,
                textAlign: 'center',
                fontSize: 15,
              }}>
              Don't have an account?
              <Text
                style={{color: colors.primary, fontWeight: 'bold'}}
                onPress={() => navigation.navigate('SignUp')}>
                {' '}
                Create Now
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
    marginTop: screen.height / 10,
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
    marginTop: screen.height / 50,
    marginBottom: 40,
  },
  bottmArea: {
    marginTop: screen.height / 12,
  },
});
