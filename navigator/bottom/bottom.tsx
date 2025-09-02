import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image } from 'react-native';
import Colors from '../../constants/color';
import HomeScreen from '../../screens/home';
import Leads from '../../screens/leads';
import Assets from '../../screens/assets';
import Wallet from '../../screens/wallet';
import Profile from '../../screens/profile';

const Tab = createBottomTabNavigator();



const getIcon = (routeName:any, focused:any) => {
  switch (routeName) {
    case 'Home':
      return require('../../assets/png/bottomIcon/home.png')
     
    case 'My Leads':
      return require('../../assets/png/bottomIcon/leads.png')

    case 'Assets':
        return require('../../assets/png/bottomIcon/battery.png')
        
    case 'Wallet':
      return require('../../assets/png/bottomIcon/wallet.png')
   
    case 'My Profile':
      return require('../../assets/png/bottomIcon/profile.png')


    default:
      return null;
  }
};

const BottomTab = () => {
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <Image
            source={getIcon(route.name, focused)}
            style={{
              width: 24,
              height: 24,
              tintColor: focused ? Colors.txtblack: Colors.lightGray,
              
            }}
            resizeMode="contain"
          />
        ),
        tabBarLabelStyle:{
          fontSize:13,
       
        },
      
        tabBarActiveBackgroundColor:Colors.white,
        tabBarActiveTintColor: Colors.txtblack,
        tabBarInactiveTintColor: Colors.lightGray,
        tabBarStyle: {
          backgroundColor: '#3D3D3D',
          height: 60,
          paddingBottom: 5,

        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="My Leads" component={Leads}/>
      <Tab.Screen name="Assets" component={Assets}/>
      <Tab.Screen name="Wallet" component={Wallet}/>
      <Tab.Screen name="My Profile" component={Profile}/>
    </Tab.Navigator>
  );
};

export default BottomTab;
