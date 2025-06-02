import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'

export default class NewPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postText: "",
      error: false,
      exito: false
    }
  }

  publicarPost() {
    if (this.state.postText !== "") {
      db.collection("posts").add({
        owner: auth.currentUser.email,
        createdAt: Date.now(),
        text: this.state.postText,
        likes: []
      })
        .then(() => {
          this.setState({ postText: "", exito: true }); //para que se limpie el campo y pueda escribir otro post
          this.props.navigation.navigate('Tab')
        })
        .catch(err => {
          console.log("error al crear post", err)
        })
    } else {
      this.setState({ error: true })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
          keyboardType='default'
          placeholder='Escribí tu post'
          onChangeText={text => this.setState({ postText: text, exito: false })}
          value={this.state.postText}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.publicarPost()}>
          <Text style={styles.buttonText}>Publicar Post</Text>
        </TouchableOpacity>
        {this.state.exito ? <Text style={styles.success}>Tu post fue publicado con éxito</Text> : null}
        {this.state.error ? <Text style={styles.errorText}>El campo no puede estar vacío</Text> : null}
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
    backgroundColor: 'white',
    height: 100,
    textAlignVertical: 'top',
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
  success: {
    color: 'green',
    textAlign: 'center',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  }
});