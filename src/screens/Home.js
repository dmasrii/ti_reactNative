import { Text, View, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import Post from '../components/Post'
import { db, auth } from '../firebase/config'


export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
        posts: [],
        loading: true
    }
  }

  componentDidMount(){
    db.collection("posts").orderBy("createdAt", "desc").onSnapshot(
        docs => {
            let posts = [];
            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                })
            this.setState({
                posts: posts,
                loading: false
            })
            })
        }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        {this.state.loading ? <ActivityIndicator size='large' color='black' />: 
        <FlatList
        data = {this.state.posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item})=> <Post id={item.id} data={item.data} showDeleteButton= {item.data.owner === auth.currentUser.email}/>}
        />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
});