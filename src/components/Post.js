import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from "../firebase/config"
import firebase from 'firebase'
import { Ionicons } from '@expo/vector-icons';

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

  borrarPost(){
      db.collection("posts")
      .doc(this.props.id)
      .delete() 
      .then(()=> console.log("Post borrado"))
      .catch(error => console.log("Error borrando post:", error));
  }

  render() {
    return (
      <View style={styles.postContainer}>

        <View style={styles.headerContainer}>
          <Text style={styles.text}>{this.props.data.text}</Text>
          <Text style={styles.owner}>{this.props.data.owner}</Text>
        </View>

        <View style={styles.likeContainer}>
        {this.state.like ? 
        <TouchableOpacity style={styles.likeButton} onPress={()=>this.deslikear()}>
            <Ionicons name="heart" size={24} color="red" />
            <Text style={styles.likesCount}>{this.state.cantLikes}</Text>
        </TouchableOpacity> : 
        <TouchableOpacity style={styles.likeButton} onPress={()=>this.likear()}>
            <Ionicons name="heart-outline" size={24} color="gray" />
            <Text style={styles.likesCount}>{this.state.cantLikes}</Text>
        </TouchableOpacity>}
        </View>

        {this.props.showDeleteButton ?
        <View style={styles.deleteContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={()=> this.borrarPost()}>
            <Ionicons name="trash-outline" size={24} color="black" />
          </TouchableOpacity> 
        </View>: null
}
        
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  text: {
    fontSize: 16,
    color: '#333',
    flex: 1
  },
  owner: {
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
    marginLeft: 10
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8
  },
  likeButton: {
   flexDirection: 'row',
   alignItems: 'center'
  },
  likesCount: {
   fontSize: 14,
   color: 'black',
   fontWeight: '600',
   marginLeft: 4
  },
  likes: {
    fontSize: 14,
    color: '#007aff',
    fontWeight: '600'
  },
  deleteContainer: {
    alignItems: 'flex-end',
    marginTop: 8
  }
});