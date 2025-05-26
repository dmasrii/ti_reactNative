import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from "../firebase/config"
import firebase from 'firebase'

export default class Post extends Component {
  constructor(props){
    super(props)
    this.state = {
        like: false,
        cantLikes: this.props.data.likes ? this.props.data.likes.length : 0
    }
  }

  componentDidMount(){
    if(this.props.data.likes){  //si la propiedad existe
        const like = this.props.data.likes.includes(auth.currentUser.email)
        const cantLikes = this.props.data.likes.length
        this.setState({
            like: like,
            cantLikes: cantLikes
        })
    }
  }

  likear(){
    db.collection("posts")
    .doc(this.props.id)
    .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then(()=> this.setState(
        {like: true,
         cantLikes: this.state.cantLikes + 1
        }
    ))
  }

  deslikear(){
    db.collection("posts")
    .doc(this.props.id)
    .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then(()=> this.setState(
        {like: false,
         cantLikes: this.state.cantLikes - 1
        }
    ))
  }

  render() {
    return (
      <View style={styles.postContainer}>
        <Text style={styles.text}>{this.props.data.text}</Text>
        <Text style={styles.likes}>Likes: {this.state.cantLikes}</Text>
        {this.state.like ? <TouchableOpacity onPress={()=>this.deslikear()}>
            <Text style={styles.likeIcon}>❤️</Text>
        </TouchableOpacity>: 
        <TouchableOpacity onPress={()=>this.likear()}>
            <Text style={styles.likeIcon}>🤍</Text>
            </TouchableOpacity>}
        <Text style={styles.owner}>{this.props.data.owner}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  owner: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
    fontStyle: 'italic',
  },
  likes: {
    fontSize: 14,
    color: '#007aff',
    fontWeight: '600',
  },
  likeIcon: {
    fontSize: 24,
    textAlign: 'left',
  }
});