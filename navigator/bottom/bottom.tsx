import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image } from 'react-native';
import Colors from '../../constants/color';
import HomeStack from '../../screens/home';
import LeadStack from '../../screens/leads';
import AssetStack from '../../screens/assets';
import WalletStack from '../../screens/wallet';
import ProfileStack from '../../screens/profile';

const Tab = createBottomTabNavigator();



const getIcon = (routeName:any, focused:any) => {
  switch (routeName) {
    case 'Home':
      return require('../../assets/png/bottomIcon/home.png')
     
    case 'Lead':
      return require('../../assets/png/bottomIcon/leads.png')

    case 'Asset':
        return require('../../assets/png/bottomIcon/battery.png')
        
    case 'Wallet':
      return require('../../assets/png/bottomIcon/wallet.png')
   
    case 'Profile':
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
      <Tab.Screen name="Home" component={HomeStack}/>
      <Tab.Screen name="Lead" component={LeadStack}/>
      <Tab.Screen name="Asset" component={AssetStack}/>
      <Tab.Screen name="Wallet" component={WalletStack}/>
      <Tab.Screen name="Profile" component={ProfileStack}/>
    </Tab.Navigator>
  );
};

export default BottomTab;
