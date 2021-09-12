import React, {useRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserDetails from '../screens/UserDetails';
import HomScreen from '../screens/HomScreen';
import Search from '../screens/Search';
import CreatePost from '../screens/CreatePost';
import Notification from '../screens/Notification';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../constants/colors';
import {useState} from 'react/cjs/react.development';
import ImageView from '../screens/ImageView';
import All from '../components/searchScreen/All';
import People from '../components/searchScreen/People';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FollowRequests from '../components/NotificationScreen/FollowRequests';
import Activity from '../components/NotificationScreen/Activity';
import Header from '../components/NotificationScreen/Header';
import {NativeBaseProvider} from 'native-base';

const MainStack = createStackNavigator();

const MainStackScreen = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="Login"
      component={Login}
      options={{headerShown: false}}
    />
  </MainStack.Navigator>
);

const ModalStack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();

const TopTabScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Search />
      <TopTab.Navigator>
        <TopTab.Screen name="All" component={All} />
        <TopTab.Screen name="People" component={People} />
      </TopTab.Navigator>
    </View>
  );
};

const NotificationTopBar = () => {
  return (
    <View style={{flex: 1}}>
      <NativeBaseProvider>
        <Header />
        <TopTab.Navigator>
          <TopTab.Screen
            options={{
              // tabBarIcon: ({focused}) => (
              //   <View>
              //     <Text
              //       style={{
              //         color: focused ? colors.primary : colors.lightGray,
              //         borderWidth: 1,
              //         width: 100,
              //         height: '100%',
              //       }}>
              //       Text
              //     </Text>
              //   </View>
              // ),
              // tabBarPressColor: 'red',
              // tabBarActiveTintColor: 'blue',

              headerShown: false,
              // tabBarShowLabel: false,
            }}
            name="FollowRequests"
            component={FollowRequests}
          />
          <TopTab.Screen name="Activity" component={Activity} />
        </TopTab.Navigator>
      </NativeBaseProvider>
    </View>
  );
};

let tabOffSet = 0;
const Tab = createBottomTabNavigator();
const BottomTabScreen = () => {
  tabOffSet = useRef(new Animated.Value(0)).current;
  // x = tabOffSet;
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}>
        <Tab.Screen
          name="HomScreen"
          component={HomScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <AntDesign
                  name="home"
                  size={20}
                  color={focused ? colors.primary : colors.lightGray}
                />
              </View>
            ),
            headerShown: false,
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffSet, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="TopTabScreen"
          component={TopTabScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <AntDesign
                  name="search1"
                  size={20}
                  color={focused ? colors.primary : colors.lightGray}
                />
              </View>
            ),
            headerShown: false,
            tabBarItemStyle: {marginRight: 40},
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffSet, {
                toValue: getWidth() - 10,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="CreatePost"
          component={CreatePost}
          options={{
            headerShown: false,
            tabBarItemStyle: styles.tabBarItemStyle,
            tabBarIcon: ({focused}) => (
              <Image
                source={require('../assets/icons/plus.png')}
                style={{width: 30, height: 30}}
              />
            ),
          }}
        />

        <Tab.Screen
          name="NotificationTopBar"
          component={NotificationTopBar}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color={focused ? colors.primary : colors.lightGray}
                />
              </View>
            ),
            tabBarItemStyle: {marginLeft: 40},
            headerShown: false,
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffSet, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="UserDetails"
          component={UserDetails}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <Feather
                  name="user"
                  size={20}
                  color={focused ? colors.primary : colors.lightGray}
                />
              </View>
            ),
            headerShown: false,
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffSet, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>
      <Animated.View
        style={{
          width: getWidth() - 20,
          height: 2,
          backgroundColor: colors.primary,
          position: 'absolute',
          bottom: 90,
          left: 50,
          borderRadius: 2,
          transform: [{translateX: tabOffSet}],
        }}></Animated.View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          position: 'absolute',
          backgroundColor: colors.primary,
          height: 60,
          width: 60,
          bottom: 60,
          borderRadius: 60,
          left: getWidth() * 2.65,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
        }}>
        <Image
          source={require('../assets/icons/plus.png')}
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
      <Modal visible={modalVisible}>
        <CreatePost onClose={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
};
const ModalStackScreen = () => (
  <ModalStack.Navigator>
    <ModalStack.Screen
      name="MainStackScreen"
      component={MainStackScreen}
      options={{headerShown: false}}
    />
    <ModalStack.Screen
      name="SignUp"
      component={SignUp}
      options={{headerShown: false}}
    />
    <ModalStack.Screen
      name="BottomTabScreen"
      component={BottomTabScreen}
      options={{headerShown: false}}
    />
    <ModalStack.Screen
      name="ImageView"
      component={ImageView}
      options={{headerShown: false}}
    />
  </ModalStack.Navigator>
);

const getWidth = () => {
  let width = Dimensions.get('screen').width;

  width = width - 80;
  return width / 5;
};
export default () => (
  <NavigationContainer>
    <ModalStackScreen />
  </NavigationContainer>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#F7F7F7',
    position: 'absolute',
    bottom: 30,
    marginHorizontal: 20,
    height: 60,
    borderRadius: 10,
    elevation: 4,
    shadowOpacity: 0.05,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  btn: {
    width: 5,
    height: 75,
    backgroundColor: 'white',
    marginBottom: 60,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },

  tabBarItemStyle: {
    position: 'absolute',
    backgroundColor: colors.primary,
    height: 60,
    width: 60,
    bottom: 30,
    borderRadius: 60,
    left: getWidth() * 2.04,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});
