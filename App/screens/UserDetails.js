import React, {useContext, useState} from 'react';
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
import FastImage from 'react-native-fast-image';
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

export default function UserDetails({navigation}) {
  const {isOpen, onOpen, onClose} = useDisclose();

  const [modalVisible, setModalVisible] = useState(false);

  const {signOut} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ScrollView>
        <NativeBaseProvider>
          <View>
            <FastImage
              style={{
                width: '100%',
                height: 250,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
              source={{
                uri: 'https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
                //   headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.avatar}>
              <Avatar
                style={{borderWidth: 2, borderColor: 'white'}}
                source={{
                  uri: 'https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
                }}
                size="2xl"></Avatar>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>Albert Forces</Text>
              <Text style={styles.bio}>
                Lifestyle photographer, traveller, dreamer{' '}
              </Text>
              <View style={styles.followSection}>
                <View style={styles.detailsBox}>
                  <Text style={styles.detailsFont1}>100</Text>
                  <Text style={styles.detailsFont2}>Posts</Text>
                </View>
                <View style={styles.detailsBox}>
                  <Text style={styles.detailsFont1}>50</Text>
                  <Text style={styles.detailsFont2}>Photos</Text>
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
            <EditProfile onClose={() => setModalVisible(false)} />
          </Modal>
          <Images navigation={navigation} />
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
  avatar: {
    alignItems: 'center',
    marginTop: -60,
  },
  userDetails: {
    padding: 20,
    paddingTop: 10,
  },
  userName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  bio: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '300',
    color: colors.lightGray,
    padding: 5,
  },
  followSection: {
    paddingVertical: 10,
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
