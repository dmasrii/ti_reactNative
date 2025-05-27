import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'

export default class NewPost extends Component {
  constructor(props){
    super(props)
    this.state= {
        postText: "",
        error: false,
        exito: false
    }
  }

  publicarPost(){
    if(this.state.postText !== ""){
        db.collection("posts").add({
        owner: auth.currentUser.email,
        createdAt: Date.now(),
        text: this.state.postText,
        likes: []
    })
    .then(()=>{
        this.setState({ postText: "", exito: true }); //para que se limpie el campo y pueda escribir otro post
    })
    .catch(err => {
        console.log("error al crear post", err)
    })
    } else{
        this.setState({error: true})
    }
  } 

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
        keyboardType='default'
        placeholder='Escribí tu post'
        onChangeText={text => this.setState({postText: text, exito: false})}
        value= {this.state.postText}
        />
        <TouchableOpacity style={styles.button} onPress={()=> this.publicarPost()}>
        <Text style={styles.buttonText}>Publicar Post</Text>
        </TouchableOpacity>
        {this.state.exito ? <Text style={styles.success}>Tu post fue publicado con exito!</Text> : null}
        {this.state.error ? <Text style={styles.error}>El campo no puede estar vacio</Text>: null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 100,
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: '#007aff',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  success: {
    color: 'green',
    marginTop: 15,
    textAlign: 'center',
    fontSize: 14
  },
  error: {
    color: 'red',
    marginTop: 15,
    textAlign: 'center',
    fontSize: 14
  }
});