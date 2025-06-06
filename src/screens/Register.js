import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
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
        auth.onAuthStateChanged((users) => {
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
                        this.setState({email:"", password: "", username: "", error: false})
                        this.props.navigation.navigate('Tab')
                    })
                    .catch(err => {console.log("err:", err)
                        this.setState({error: true})
                    }
                )
                })
        } else{
            this.setState({error:true})
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Register</Text>
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


                <TouchableOpacity style={styles.button} onPress={() => this.registrarUsuario(this.state.email, this.state.password, this.state.username)}>
                    <Text style={styles.buttonText}>Registrarme</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { this.props.navigation.navigate("Login") }}>
                    <Text style={styles.buttonText}>Iniciar Sesion</Text>
                </TouchableOpacity>
                {this.state.error ? <Text style={styles.errorText}>Credenciales invalidas</Text> : null}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f0f8ff',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 12,
        borderRadius: 6,
        backgroundColor: 'white',
    },
    button: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
        backgroundColor: '#e6f0ff',
        marginBottom: 10,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: 'bold',
    fontSize: 16
    }
});
