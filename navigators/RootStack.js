import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import MainTab from '../screens/MainTab';

import FontAwesome from 'react-native-vector-icons/FontAwesome';



const Stack = createStackNavigator();

const RootStack = () => {

  return (
    <NavigationContainer >
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{header: () => null}}
       /*  options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
            shadowColor: '#f9fafd',
            elevation: 0,
          }, */
          /* headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <FontAwesome.Button 
                name="long-arrow-left"
                size={25}
                backgroundColor="#f9fafd"
                color="#333"
                onPress={() => navigation.navigate('Login')}
              />
            </View>
          ), 
        })}*/
      />
       <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{header: () => null}}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
