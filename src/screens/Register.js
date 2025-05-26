import React, { Component } from 'react'
import {Text, View, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import {auth} from "../firebase/config"

export default class Register extends Component {
    constructor(props){
        super(props)
        this.state={
            email:"",
            password:"",
            username:"",
            error: false
        }
    }


    componentDidMount(){
        auth.onAusthStateChanged((users) =>  {
            if (users){
                this.props.navigation.navigate("Tab")
            }
        })
    }






  render() {
    return (
      <View>
        <Text>Register</Text>
      </View>
    )
  }
}