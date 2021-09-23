import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import {
  Avatar,
  NativeBaseProvider,
  Actionsheet,
  useDisclose,
  Icon,
} from 'native-base';
import colors from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Images from '../components/UserDetailsScreen/Images';
import EditProfile from './EditProfile';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../util/AuthContext';
import {ConventionContex} from '../util/ConvetionContext';
import Entypo from 'react-native-vector-icons/Entypo';

export default function UserDetails() {
  const {isOpen, onOpen, onClose} = useDisclose();

  const [modalVisible, setModalVisible] = useState(false);

  const {signOut, checkValue} = useContext(AuthContext);

  const {userName, img, bio, userId, setImg} = useContext(ConventionContex);

  useEffect(() => {
    checkValue();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <NativeBaseProvider>
          <View style={styles.header}>
            <Entypo name="user" size={20} style={{paddingLeft: 20}} />
            <Text style={styles.userName}>{userName}</Text>
          </View>
          <View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  marginTop: 20,
                }}>
                <View style={styles.avatar}>
                  <Avatar
                    style={{borderWidth: 2, borderColor: 'white'}}
                    source={{
                      uri: img.profileImg,
                    }}
                    size="xl"></Avatar>
                </View>

                <View style={styles.followSection}>
                  <View style={styles.detailsBox}>
                    <Text style={styles.detailsFont1}>100</Text>
                    <Text style={styles.detailsFont2}>Posts</Text>
                  </View>

                  <View style={styles.detailsBox}>
                    <Text style={styles.detailsFont1}>10k</Text>
                    <Text style={styles.detailsFont2}>Followers</Text>
                  </View>
                  <View style={styles.detailsBox}>
                    <Text style={styles.detailsFont1}>64</Text>
                    <Text style={styles.detailsFont2}>Following</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.bio}>{bio + ''} </Text>
            </View>

            <View style={styles.userDetails}>
              <View
                style={{
                  width: '100%',
                  height: 40,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => setModalVisible(true)}>
                  <Text
                    style={{fontWeight: 'bold', textTransform: 'uppercase'}}>
                    Edit Profile
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btn, {width: '12%'}]}
                  onPress={() => onOpen()}>
                  <AntDesign name="setting" size={30} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <EditProfile onClosed={() => setModalVisible(false)} />
          </Modal>
          <Images />
          <View
            style={{
              height: 100,
              width: 50,

              backgroundColor: 'white',
            }}></View>

          <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
            <Actionsheet.Content>
              <Actionsheet.Item
                startIcon={
                  <Icon
                    as={<MaterialIcons name="logout" />}
                    color="muted.500"
                    mr={3}
                  />
                }
                onPress={() => signOut()}>
                Logout
              </Actionsheet.Item>
            </Actionsheet.Content>
          </Actionsheet>
        </NativeBaseProvider>
      </ScrollView>
    </View>
  );
}

const screen = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
    alignItems: 'center',
    // marginTop: 20,
  },
  userDetails: {
    padding: 20,
    paddingTop: 10,
  },
  userName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    paddingLeft: 20,
  },
  bio: {
    fontSize: 12,
    fontWeight: '300',
    color: colors.lightGray,
    paddingLeft: 20,
    padding: 10,
  },
  followSection: {
    // paddingVertical: 10,
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  detailsBox: {
    width: screen.width / 5,
    // borderWidth: 1,
    height: screen.width / 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsFont1: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
  },
  detailsFont2: {
    color: colors.lightGray,
    fontWeight: '500',
  },
  btn: {
    width: '80%',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.lightGray,
    borderRadius: 5,
  },

  navigation: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    width: '100%',
    height: 50,

    position: 'absolute',
    top: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
