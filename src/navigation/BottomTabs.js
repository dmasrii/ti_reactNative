import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {FontAwesome} from '@expo/vector-icons'
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import NewPost from '../screens/NewPost'


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
        <Tab.Screen  name="New-Post"  component={NewPost} options={{
            tabBarIcon: () => <FontAwesome name="edit" size={24} color={'firebrick'} />
        }}/>
    </Tab.Navigator>
  )
}