import { Text, View, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import {auth, db} from "../firebase/config";
import Post from '../components/Post';

export default class Profile extends Component {
  constructor(props){
        super(props)
        this.state = {
          posts: [],
          loading: true
        }
    }
  
  componentDidMount(){
    db.collection("posts")
    .where("owner", "==", auth.currentUser.email)
    .onSnapshot(docs =>
    {let userPosts= [];
     docs.forEach(doc => {
     userPosts.push({
       id: doc.id,
       data: doc.data()
    });
    });
    this.setState({posts: userPosts, loading: false})
    });
  }

  borrarPost(id){
    db.collection("posts")
    .doc(id)
    .delete() //no se si se puede pero no sabia como hacerlo sino
    .then(()=> console.log("Post borrado"))
  }

  logout(){
    auth.signOut()
    .then(()=>
    this.props.navigation.navigate("Login"))
    .catch(err => console.log(err))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mi perfil</Text>
        <Text style={styles.email}>{auth.currentUser.email}</Text>
        {this.state.loading ? 
        <ActivityIndicator size="large" color="black"/>
        : this.state.posts.length === 0 ?
        <Text style={styles.noPosts}>No hay posts</Text> :
        <FlatList 
        data= {this.state.posts}
        keyExtractor={(item)=> item.id.toString()}
        renderItem = {({item}) =>
        <View>
          <Post data={item.data} id={item.id}/>
          <TouchableOpacity style={styles.deleteButton} onPress={()=> this.borrarPost(item.id)}>
            <Text style={styles.buttonText}>Borrar Post</Text>
          </TouchableOpacity>
          </View> }
        /> 
        }
        <TouchableOpacity style={styles.logoutButton} onPress={()=> this.logout()}>
            <Text style={styles.buttonText}>Cerrar sesion</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 20,
    paddingTop: 40
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#777',
  },
  noPosts: {
  textAlign: 'center',
  marginTop: 30,
  color: '#999',
  fontSize: 16,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: "#ffcccc",
    marginBottom: 10
  },
  deleteText: {
    color: '#fff',
    fontWeight: '600',
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#e6f0ff',
    marginBottom: 10
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  }
});