import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from "../firebase/config"

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            error: false
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((users) => {
            if (users) {
                this.props.navigation.navigate("Tab")
            }
        }

        )
    }

    loginUsuario(email,password){
        if (email !== "" && password !== "") {
            auth.signInWithEmailAndPassword(email,password)
            .then(() => {
                this.setState({email:"", password: "", error: false})
                this.props.navigation.navigate("Tab")
            })
            .catch((err) =>{ 
                console.log(err)
                this.setState({error: true}
            )})
        }else{
            this.setState({error:true})
        }
    }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesion</Text>
        {this.state.error?
        <Text style={styles.errorText} >Credenciales Invalidas</Text>
        :
        null
        }
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
        <TouchableOpacity style={styles.button} onPress={() => this.loginUsuario(this.state.email,this.state.password)}>
            <Text style={styles.buttonText} >Iniciar Sesion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=> {this.props.navigation.navigate("Register")}}>
            <Text style={styles.buttonText}>Crear Cuenta</Text>
        </TouchableOpacity>
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
      }
})
