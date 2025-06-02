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

    userPosts.sort((a,b)=> b.data.createdAt - a.data.createdAt);

    this.setState({posts: userPosts, loading: false})
    });
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
        
        <View style={styles.contentContainer}>
          {this.state.loading ? 
            <ActivityIndicator size="large" color="black"/>
            : this.state.posts.length === 0 ?
            <View style={styles.noPostContainer}>
              <Text style={styles.noPosts}>No hay posteos todavía</Text> 
            </View>:
            <FlatList 
              data= {this.state.posts}
              keyExtractor={(item)=> item.id.toString()}
              renderItem = {({item}) =>
                <Post data={item.data} id={item.id} showDeleteButton={true}/>
              }
          /> 
        }
        </View>
    
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
    paddingTop: 40,
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
  contentContainer: {
    flex: 1, // Empuja el contenido y deja el botón abajo
  },
  noPostsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPosts: {
    textAlign: 'center',
    color: '#555',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
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
  }
});