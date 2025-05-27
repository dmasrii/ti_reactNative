import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {FontAwesome} from '@expo/vector-icons'
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Post from '../components/Post'


const Tab = createBottomTabNavigator();
export default function BottomTabs() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Home"  component={Home} options={{
            tabBarIcon: ()=> <FontAwesome name="home" size={24} color={'orchid'}/>
        }}/>
        <Tab.Screen name="Profile"  component={Profile} options={{
            tabBarIcon: ()=> <FontAwesome name="user" size={24} color={'teal'} /> // me falta el de crear post 
        }}/>
        <Tab.Screen  name="Posts"  component={Post} options={{
            tabBarIcon: () => <FontAwesome name="paperclip" size={24} color={'firebrick'} />
        }}/>
    </Tab.Navigator>
  )
}