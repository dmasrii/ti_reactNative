import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { auth } from "../firebase/config"

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            username: "",
            error: false
        }
    }


    componentDidMount() {
        auth.onAusthStateChanged((users) => {
            if (users) {
                this.props.navigation.navigate("Tab")
            }
        })
    }


    registrarUsuario(email, password, username) {
        if ((email !== "" &&
            password !== "" &&
            username !== ""
        ) &&
            password.length >= 6 &&
            email.includes("@") &&
            username.length > 3
        ) {
            auth.createUserWithEmailAndPassword(email, password)
                .then(() => {

                    db.collection('users').add({//metodo add siempre recibe un objeto literal
                        owner: auth.currentUser.email,
                        createdAt: Date.now(),
                        updatedAt: Date.now(),
                    })
                        .then(() => {
                            this.props.navigation.navigate('Tab')
                        })
                        .catch(err => console.log("err:", err))


                    this.props.navigation.navigate("Tab")
                })

        }
    }



    render() {
        return (
            <View>
                <Text>Register</Text>
                <TextInput
                    style={styles.input} //email
                    keyboardType='default'
                    value={this.state.email}
                    onChangeText={(texto) => this.setState({ email: texto, error: false })}
                    placeholder='Ingresa tu email'
                />

                <TextInput //contraseña
                    style={styles.input}
                    keyboardType='default'
                    value={this.state.password}
                    onChangeText={(texto) => this.setState({ password: texto, error: false })}
                    placeholder='Ingresa tu password'
                    secureTextEntry={true}
                />

                <TextInput //username
                    style={styles.input}
                    keyboardType='default'
                    value={this.state.username}
                    onChangeText={(texto) => this.setState({ username: texto, error: false })}
                    placeholder='Ingresa tu nombre de usuario'
                />


                <TouchableOpacity onPress={() => this.registrarUsuario(this.state.email, this.state.password, this.state.username)}>
                    <Text>Registrarme</Text>
                </TouchableOpacity>
                {this.state.error ? <Text>Credenciales invalidas</Text> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderColor: "red"
    }
})



