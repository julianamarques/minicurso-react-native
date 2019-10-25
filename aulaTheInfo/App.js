/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'; 
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  StatusBar,
} from 'react-native';

export default class App extends Component {
  // https://userspiaula.herokuapp.com/users

  constructor(props) {
    super(props);

    this.state = {
      usuarios: []
    }
  }

  componentDidMount() {
    const URL_BASE_API = 'https://userspiaula.herokuapp.com/'

    const api = axios.create({
      baseURL: URL_BASE_API
    })

    const USERS_ROTA = 'users/'

    let usuariosRecebidos = []

    api.get(USERS_ROTA).then(response => {
      response.data.map((user) => {
        let usuario = {}
        usuario.nome = user.name
        usuario.fone = user.phone
        usuario.gender = user.gender
        usuariosRecebidos.push(usuario)
      }),
      this.setState({
        usuarios: usuariosRecebidos
      })
    })
  }

  render() {
   return(
     <View style={{
       flex: 1,
       backgroundColor: '#000'
     }}>
       <FlatList style={{flex: 1}}
        data={this.state.usuarios}
        renderItem={({item}) => 
          <View style={{
            height: 100,
            backgroundColor: '#fff',
            margin: 16,
            padding: 10
          }}>

            <Text style={{
              color: '#000',
              fontSize: 20
            }}>{item.nome}</Text>

            <Text style={{
              color: '#000',
              fontSize: 16
            }}>{item.fone}</Text>

            <Text style={{
              color: '#000',
              fontSize: 16
            }}>{item.gender}</Text>

          </View> 
        }/>
     </View>
   )
  }
}
