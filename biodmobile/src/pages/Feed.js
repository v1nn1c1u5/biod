import React, { Component } from 'react';
import api from '../services/api';

import { View, Image, TouchableOpacity } from 'react-native';

import camera from '../assets/camera.png';


export default class Feed extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity style={{ marginRight: 20 }} onPress={ () => navigation.navigate('New') }>
        <Image source={camera}/>
      </TouchableOpacity>

    ),

  });

  state = {
    feed: [],
  };

  // arrow function para implementar os likes
  handleLike = id => {
    api.post(`/posts/${id}/like`);
  }

  async componentDidMount() {
      //this.registerToSocket();
    
      const response = await api.get('posts')
            .catch( (erro) => {
              console.log(erro.response);
              

            });

      console.log(response.data);

      this.setState({ feed: response.data });

  }


  render() {
    return <View />;
  }
}
