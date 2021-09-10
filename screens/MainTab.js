import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {View, TouchableOpacity, Text,TextInput,Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SearchBar from "react-native-dynamic-search-bar";
import Profil from './../screens/Profil';
import Notifications from './../screens/Notifications';
import Home from './../screens/Home';
import Message from './Message';
import AddPost from './../screens/AddPost';
import EditProfil from '../screens/EditProfil';
import Chat from './Chat';
import Search from './Search';
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
function LogoTitle() {
  return (
 
      <Text style={{fontWeight: 'bold', fontSize: 25, color: "#2e64e5",top:8,marginStart:-150,
      fontFamily:'Kufam-SemiBoldItalic'}}>
            FaceTn</Text> 

 
  );
}
function Searchbarre() {
  return (
    <SearchBar
    placeholder="Chercher"
    onPress={() => alert("onPress")}
    onChangeText={(text) => console.log(text)}
  />

 
  );
}

const FeedStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="FaceTn"
      component={Home}
      options={{
        headerTitle:props => <LogoTitle {...props} /> ,
         safeAreaInsets:{top:0},
        headerTitleAlign: 'center',
        headerTitleStyle: {
          top:10,
          color: '#2e64e5',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 18,
        },
        
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
          height : 50,
          
        }, 
        
        headerRight: () => (
          <View style={{marginRight: 10,top:5}}>
            <FontAwesome5.Button
              name="plus"
              size={22}
              backgroundColor="#fff"
              color="#2e64e5"
              onPress={() => navigation.navigate('AddPost')}
            />
          </View>
        ),
        headerLeft: () => (null),

      }}
    />
    <Stack.Screen
      name="AddPost"
      component={AddPost}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#2e64e515',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="Profil"
      component={Profil}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
          
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const MessageStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="Messages" component={Message}  options={{
       headerTitleAlign: 'center'
            /*headerLeft: () => (
              <View style={{marginLeft: 10}}>
                <Ionicons
                  name="arrow-back"
                  size={25}
                  backgroundColor="#f9fafd"
                  color="#333"
                  onPress={() => navigation.navigate('Home')}
                />
              </View>
            ),*/
      }}  />
     <Stack.Screen
      name="Chat"
      component={Chat}
      options={({route}) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    /> 
  </Stack.Navigator>
);
const NotificationStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="Notifications" component={Notifications}  options={{
             headerTitleAlign: 'center'
            /* headerLeft: () => (
              <View style={{marginLeft: 10}}>
                <Ionicons
                  name="arrow-back"
                  size={25}
                  backgroundColor="#f9fafd"
                  color="#333"
                  onPress={() => navigation.navigate('Home')}
                />
              </View>
            ), */
      }} />
     <Stack.Screen
      name="Chat"
      component={Chat}
      options={({route}) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    /> 
  </Stack.Navigator>
);
const SearchStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="Search" component={Search}  options={{
              headerTitle:props => <Searchbarre {...props} />  ,
            /* headerLeft: () => (
              <View style={{marginLeft: 10}}>
                <Ionicons
                  name="arrow-back"
                  size={25}
                  backgroundColor="#f9fafd"
                  color="#333"
                  onPress={() => navigation.navigate('Home')}
                />
              </View>
            ), */
      }} />
     <Stack.Screen
      name="Profil"
      component={Profil}
      options={({route}) => ({
        //title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    /> 
  </Stack.Navigator>
);


const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profil"
      component={Profil}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="EditProfil"
      component={EditProfil}
      options={{
        headerTitle: 'Edit Profil',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
          height : 80,
        },
      }}
    />
  </Stack.Navigator>
);

const MainTab = (navigation) => {
 /*   const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Chat') {
      return false;navigation
    }
    return true;
  }; */
  return (
    
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#2e64e5',
      }}>
      <Tab.Screen
        name="Home"
        component={FeedStack}
        options={({route}) => ({
          tabBarLabel: 'Acceuil',
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={25}
            />
          ),
        })}
      />
       <Tab.Screen
        name="Search"
        component={SearchStack}
        options={({route}) => ({
          tabBarLabel: 'Chercher',
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="search-outline"
              color={color}
              size={25}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Messages"
        component={MessageStack}
        options={({route}) => ({
         // tabBarVisible: getTabBarVisibility(route), 
        
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              color={color}
              size={25}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileStack}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={25} />
          ),
        }}
      />
       <Tab.Screen
        name="Notifications"
        component={NotificationStack}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="notifications-outline" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;





/* import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Profil from './../screens/Profil';
import Notifications from './../screens/Notifications';
import Home from './../screens/Home';
import Message from './Message';
import AddPost from './AddPost';
import { TouchableOpacity,Image,View,StyleSheet } from 'react-native';
const Tab = createMaterialBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: '#3df6e8' }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
     
       <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarLabel: 'Message',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat" color={color} size={26} />
          ),
        }}
      />
       <Tab.Screen
        name="AddPost"
        component={AddPost}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus-circle" color={color} size={26} />
          ),
        }}
       
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
        <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
     
    </Tab.Navigator>
  );
} 

export default MainTab; */